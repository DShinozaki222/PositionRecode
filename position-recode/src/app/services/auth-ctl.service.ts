import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { RequestService } from './request.service';
import { TUserCheck } from '../types/t-login-check';
import { Urls } from '../models/urls';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TParameterBodyRequestOption } from '../types/t-parameter-body-request-option';
import { LocalStorageHelper } from '../utilities/local-storage-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthCtlService {

  private _user: User = new User('', '');
  public get user(): User {
    return this._user;
  }
  public set setUser(u: User) {
    this._user = u;
  }

  constructor() { }

  public storageCheck(): User {
    const ls = new LocalStorageHelper();
    const selectObj = ls.select<{[k: string]: string}>('user');
    if (!selectObj) {
      return new User('', '');
    }
    const user = new User(selectObj['_userName'], selectObj['_mail'])
    if (!this._user.mail) {
      this._user = user;
    }
    return user;
  }

  /**
   * ログイン実行
   * @param request 
   * @param mail 
   * @param password 
   * @returns 
   */
  public login(request: RequestService, mail: string, password: string) {
    const user: {[k: string]: string} = {
      mail: mail,
      password: password
    };
    const httpOptions: TParameterBodyRequestOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      withCredentials: true,
      observe: 'response',
      reportProgress: true,
      responseType: 'json'
    };
    const param = 'user=' + JSON.stringify(user);
    const sub = new Subject<TUserCheck>();
    request.postRequest<TUserCheck, string>(Urls.Login, param, false, httpOptions).subscribe({
      next: (response) => {
        if (response.body === undefined || response.body === null) {
          const errorResponse = {
            result: false,
            username: '',
            mail: '',
            message: ''
          };
          sub.next(errorResponse);
          sub.complete();
          return;
        }

        this._user = new User(response.body.username, response.body.mail);
        const ls = new LocalStorageHelper();
        ls.save<User>('user', this._user);
        sub.next(<TUserCheck>response.body);
        sub.complete();
      },
      error: (error) => {
        console.log(error);
        const errorResponse = {
          result: false,
          username: '',
          mail: '',
          message: ''
        };
        sub.next(errorResponse);
        sub.complete();
      }
    }).add(() => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
    return sub;
  }

  /**
   * ユーザ登録
   * @param request 
   * @param name 
   * @param mail 
   * @param password 
   * @returns 
   */
  public regist(request: RequestService, name: string, mail: string, password: string) {
    const registData: {[k: string]: string} = {
      name: name,
      mail: mail,
      password: password
    };
    const httpOptions: TParameterBodyRequestOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      withCredentials: true,
      observe: 'response',
      reportProgress: true,
      responseType: 'json'
    };
    const param = 'regist=' + JSON.stringify(registData);
    const sub = new Subject<TUserCheck>();
    request.postRequest<TUserCheck, string>(Urls.UserRegist, param, false, httpOptions).subscribe({
      next: (response) => {
        if (response.body === undefined || response.body === null) {
          const errorResponse = {
            result: false,
            username: '',
            mail: '',
            message: ''
          };
          sub.next(errorResponse);
          sub.complete();
          return;
        }

        this._user = new User(response.body.username, response.body.mail);
        const ls = new LocalStorageHelper();
        ls.save<User>('user', this._user);
        sub.next(<TUserCheck>response.body);
        sub.complete();
      },
      error: (error) => {
        console.log(error);
        const errorResponse = {
          result: false,
          username: '',
          mail: '',
          message: ''
        };
        sub.next(errorResponse);
        sub.complete();
      }
    }).add(() => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
    return sub;
  }

  /**
   * ログアウト
   */
  public logout() {
    const ls = new LocalStorageHelper();
    ls.delete('user');
  }
}
