import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Store } from 'src/app/models/store';
import { AuthCtlService } from 'src/app/services/auth-ctl.service';
import { RequestService } from 'src/app/services/request.service';
import { StoreManagedService } from 'src/app/services/store-managed.service';
import { TNominatimAddress } from 'src/app/types/t-nominatim-reverse';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public store: Store = new Store();

  public zoom = 17;
  public center: google.maps.LatLngLiteral = {
    lat: this.store.latitude,
    lng: this.store.longitude
  };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapTypeControl: true
  };
  public currentPosition: google.maps.LatLngLiteral = {
    lat: this.store.latitude,
    lng: this.store.longitude
  };

  public storeName = '';
  public starCount = 0;
  public address = '';
  public favorite = false;
  
  public note = '';
  public isUpdate = false;

  private beforeAddress = '';
  private latitude = 0;
  private longitude = 0;
  private nominatim: TNominatimAddress = {
    "ISO3166-2-lvl4": '',
    country: '',
    country_code: '',
    county: '',
    neighbourhood: '',
    postcode: '',
    province: '',
    town: '',
    city: ''
  }

  constructor(private activeRouter: ActivatedRoute, private router: Router, public storeManaged: StoreManagedService, private requestSender: RequestService, private authCtl: AuthCtlService) { }

  public async ngOnInit(): Promise<void> {
    const user = this.authCtl.storageCheck();
    if (!user.mail) {
      await this.router.navigate(['login']);
      return;
    }
    if (this.storeManaged.storeList.length === 0) {
      await lastValueFrom(this.storeManaged.setUp(this.requestSender, this.authCtl.user));
    }
    this.activeRouter.queryParams.subscribe({
      next: async (v: { [k: string]: string }) => {
        if (!v || !v['id']) {
          this.store = await lastValueFrom(new Store().nowPosition(this.requestSender));
          this.nominatim = this.store.address;
          this.latitude = this.store.latitude;
          this.longitude = this.store.longitude;
          if (this.store.favorite === 1) {
            this.favorite = true;
          }
          this.address = `${this.store.address.province} ${this.store.address.county} ${this.store.address.town} ${this.store.address.city} ${this.store.address.neighbourhood}`;
          this.center = {
            lat: this.store.latitude,
            lng: this.store.longitude
          };
          this.currentPosition = {
            lat: this.store.latitude,
            lng: this.store.longitude
          };
          return;
        }

        this.store = this.storeManaged.select(Number(v['id']));
        this.isUpdate = true;
        this.nominatim = this.store.address;
        this.latitude = this.store.latitude;
        this.longitude = this.store.longitude;
        if (this.store.favorite === 1) {
          this.favorite = true;
        }
        this.starCount = this.store.evaluation;
        this.storeName = this.store.storeName;
        if (this.store.address.province) {
          this.address += this.store.address.province;
          this.beforeAddress += this.store.address.province;
        }
        if (this.store.address.county) {
          this.address += this.store.address.county;
          this.beforeAddress += this.store.address.county;
        }
        if (this.store.address.city) {
          this.address += this.store.address.city;
          this.beforeAddress += this.store.address.city;
        }
        if (this.store.address.town) {
          this.address += this.store.address.town;
          this.beforeAddress += this.store.address.town;
        }
        if (this.store.address.neighbourhood) {
          this.address += this.store.address.neighbourhood;
          this.beforeAddress += this.store.address.neighbourhood;
        }
        this.note = this.store.note;
        this.center = {
          lat: this.store.latitude,
          lng: this.store.longitude
        };
        this.currentPosition = {
          lat: this.store.latitude,
          lng: this.store.longitude
        };
      },
      error: (error) => {
        console.log(error);
      }
    }).unsubscribe();
  }

  public async mapClick(event: any) {
    this.center = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.currentPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    const reverseAddress = await this.store.geocodeReverse(this.requestSender, event.latLng.lat(), event.latLng.lng());
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
    this.nominatim = reverseAddress;
    this.address = '';
    if (reverseAddress.province) {
      this.address += reverseAddress.province;
    }
    if (reverseAddress.county) {
      this.address += reverseAddress.country;
    }
    if (reverseAddress.city) {
      this.address += reverseAddress.city;
    }
    if (reverseAddress.town) {
      this.address += reverseAddress.town;
    }
    if (reverseAddress.neighbourhood) {
      this.address += reverseAddress.neighbourhood;
    }
  }

  public async inputAddress() {
    if (!this.address) {
      this.address = this.beforeAddress;
      return;
    }
    const location = await this.store.geocodeAddress(this.requestSender, this.address);
    if (location.lat === 0 && location.lng === 0) {
      this.address = this.beforeAddress;
      return;
    }
    this.center = {
      lat: location.lat,
      lng: location.lng
    };
    this.currentPosition = {
      lat: location.lat,
      lng: location.lng
    };
    this.nominatim = location.address;
    this.latitude = location.lat;
    this.longitude = location.lng;
  }

  public async update() {
    let favNum = 0;
    if (this.favorite) {
      favNum = 1;
    }
    const store = await lastValueFrom(this.store.update(this.requestSender, this.storeName, favNum, this.starCount, this.latitude, this.longitude, this.nominatim, this.note));
    if (!store.id) {
      alert('更新に失敗しました');
      return;
    }
    alert('更新しました');
    this.store = store;
    this.storeManaged.set(store);
    this.router.navigate(['detail'], {queryParams: {id: store.id}});
  }

  public async regist() { 
    let favNum = 0;
    if (this.favorite) {
      favNum = 1;
    }
    const store = await lastValueFrom(this.store.regist(this.requestSender, this.authCtl.user, this.storeName, favNum, this.starCount, this.latitude, this.longitude, this.nominatim, this.note));
    if (!store.id) {
      alert('登録に失敗しました');
      return;
    }
    alert('登録しました');
    this.store = store;
    this.storeManaged.set(store);
    this.router.navigate(['detail'], {queryParams: {id: store.id}});
  }

  public return() {
    if (this.store.id) {
      this.router.navigate(['detail'], { queryParams: { id: this.store.id } });
    } else {
      this.router.navigate(['top']);
    }
  }
}
