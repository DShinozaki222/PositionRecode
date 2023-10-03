import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthCtlService } from 'src/app/services/auth-ctl.service';
import { RequestService } from 'src/app/services/request.service';
import { StoreManagedService } from 'src/app/services/store-managed.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mail = '';
  public password = '';
  public isChangeShow = true;
  public registName = '';
  public registMail = '';
  public registPassword = '';
  public comfirmRegistPassword = '';
  public isDialog = false;

  constructor(private requestSender: RequestService, private authCtl: AuthCtlService, private router: Router, private storeManaged: StoreManagedService) {}

  public async ngOnInit(): Promise<void> {}

  /**
   * ログインボタンの活性化・非活性化
   * @returns 
   */
  public isActevateLoginBtn(): boolean {
    if (!this.mail || !this.password) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 登録ボタンの活性化・非活性化
   * @returns 
   */
  public isActivateRegistBtn(): boolean {
    if (!this.registName || !this.registMail || !this.registPassword || !this.comfirmRegistPassword) {
      return true;
    } else if (this.registPassword !== this.comfirmRegistPassword) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * ログインボタン
   * @returns 
   */
  public async login(): Promise<void> {
    if (!this.mail || !this.password) {
      return;
    }

    const result = await lastValueFrom(this.authCtl.login(this.requestSender, this.mail, this.password));

    if (!result.result) {
      alert('メールアドレス、またはパスワードが一致しません');
      return;
    }

    await lastValueFrom(this.storeManaged.setUp(this.requestSender, this.authCtl.user));

    await this.router.navigate(['top']);
  }

  /**
   * 登録ボタン
   * @returns 
   */
  public async regist() {
    if (!this.registMail || !this.registName || !this.registPassword) {
      return;
    }

    const result = await lastValueFrom(this.authCtl.regist(this.requestSender, this.registName, this.registMail, this.registPassword));

    if (!result.result) {
      alert('登録できませんでした。入力内容をご確認ください');
      return;
    }
    await this.router.navigate(['top']);
  }

}
