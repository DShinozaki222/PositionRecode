import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Store } from 'src/app/models/store';
import { AuthCtlService } from 'src/app/services/auth-ctl.service';
import { RequestService } from 'src/app/services/request.service';
import { StoreManagedService } from 'src/app/services/store-managed.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(private requestSender: RequestService, private authCtl: AuthCtlService, private router: Router, public storeManaged: StoreManagedService) { }

  public async ngOnInit() {
    const user = this.authCtl.storageCheck();
    if (!user.mail) {
      await this.router.navigate(['login']);
      return;
    }

    if (this.storeManaged.storeList.length === 0) {
      await lastValueFrom(this.storeManaged.setUp(this.requestSender, this.authCtl.user));
    }
  }

  public logout() {
    // ToDo: ユーザ情報を破棄してログイン画面に遷移
    this.router.navigate(['login']);
  }

  public async simpleRegist() {
    const store = new Store();
    const savedStore = await lastValueFrom(store.simpleRegist(this.requestSender, this.authCtl.user));
    if (savedStore.id === 0) {
      alert('登録に失敗しました');
      return;
    }
    this.storeManaged.set(savedStore);
    alert('登録しました');
  }

  public regist() {
    // ToDo: 新規追加でedit画面に遷移
    this.router.navigate(['edit']);
  }

  public detail(selectRow: any) {
    this.router.navigate(['detail'], { queryParams: { id: selectRow.data.id } });
  }

}
type row = {
  data: Store,
  index?: number,
  originalEvent: PointerEvent,
  type: string
}