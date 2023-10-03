import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreManagedService } from 'src/app/services/store-managed.service';
import { Store } from 'src/app/models/store';
import { lastValueFrom } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { AuthCtlService } from 'src/app/services/auth-ctl.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  public store: Store = new Store();
  public starCount = 0;
  public zoom = 17;
  public center: google.maps.LatLngLiteral = {
    lat: this.store.latitude,
    lng: this.store.longitude
  };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true
  };
  public currentPosition: google.maps.LatLngLiteral = {
    lat: this.store.latitude,
    lng: this.store.longitude
  };

  public favorite = 0;
  public isDialog = false;
  public note = '';

  constructor(private activeRouter: ActivatedRoute, private router: Router, public storeManaged: StoreManagedService, private requestSender: RequestService, private authCtl: AuthCtlService) {}

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
      next: (v: {[k: string]: string}) => {
        this.store = this.storeManaged.select(Number(v['id']));
        this.starCount = this.store.evaluation;
        this.favorite = this.store.favorite;
        this.note = this.store.note;
        this.center = {
          lat: this.store.latitude,
          lng: this.store.longitude
        };
        this.currentPosition = {
          lat: this.store.latitude,
          lng: this.store.longitude
        };
      }
    }).unsubscribe();
  }

  public edit(): void {
    this.router.navigate(['edit'], {queryParams: {id: this.store.id}});
  }

  public async delete(): Promise<void> {
    const result = await lastValueFrom(this.store.delete(this.requestSender));
    if (!result) {
      alert('削除できませんでした');
      return;
    }
    this.storeManaged.delete(this.store.id);
    alert('削除しました');
    this.router.navigate(['top']);
  }

  public return(): void {
    this.router.navigate(['top']);
  }
}
