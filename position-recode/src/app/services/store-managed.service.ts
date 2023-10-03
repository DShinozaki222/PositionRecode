import { Injectable } from '@angular/core';
import { Store } from '../models/store';
import { RequestService } from './request.service';
import { User } from '../models/user';
import { TParameterBodyRequestOption } from '../types/t-parameter-body-request-option';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TStore } from '../types/t-store';
import { Urls } from '../models/urls';

@Injectable({
  providedIn: 'root'
})
export class StoreManagedService {

  private _stores: {[id: number]: Store} = {}
  public get stores(): {[id: number]: Store}{
    return this._stores;
  }
  public get storeList(): Store[] {
    return Object.values(this._stores).map((v) => {return v});
  }

  constructor() { }

  /**
   * 初回の店舗データ取得
   * @param requestSender 
   * @param user 
   * @returns 
   */
  public setUp(requestSender: RequestService, user: User) {
    const userParam: {[k: string]: string} = {
      mail: user.mail
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
    const param = 'user=' + JSON.stringify(userParam);
    const sub = new Subject<boolean>();
    requestSender.postRequest<TStore[], string>(Urls.StoreAllSelect, param, false, httpOptions).subscribe({
      next: (response) => {
        if (response.body === undefined || response.body === null) {
          sub.next(false);
          sub.complete();
          return;
        }
        response.body.forEach((v) => {
          this._stores[v.id] = new Store(v.id, v.storeName, v.latitude, v.longitude, v.favorite, v.evaluation, v.country, v.countryCode, v.county, v.neighbourhood, v.postcode, v.province, v.town, v.city, v.note, v.registAt);
        });
        sub.next(true);
        sub.complete();
      },
      error: (error) => {
        console.log(error);
        sub.next(false);
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
   * 特定の店舗データの取得
   * @param id 
   * @returns 
   */
  public select(id: number): Store {
    return <Store>this.stores[id];
  }

  /**
   * 店舗データの更新、また新規追加
   * @param store 
   */
  public set(store: Store): void {
    this._stores[store.id] = store;
  }

  /**
   * 店舗データの削除
   * @param id 
   */
  public delete(id: number): void {
    delete this._stores[id];
  }
}
