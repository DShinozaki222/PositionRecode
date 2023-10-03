import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TRequestResponse } from '../types/t-request-response';
import { environment } from '../../environments/environment';
import { TGetRequestOption } from '../types/t-get-request-option';
import { TParameterBodyRequestOption } from '../types/t-parameter-body-request-option';
import { TDeleteRequestOption } from '../types/t-delete-request-option';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _httpClinet: HttpClient) { }

  /**
   * Get Method Request
   * @param uri 
   * @param isAnotherURL
   * @param options 
   * @returns 
   */
  public getRequest<T>(uri: string, isAnotherURL = false, options?: TGetRequestOption): Subject<TRequestResponse<T>> {
    const url = isAnotherURL ? uri : environment.apiUrl + uri;
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
        withCredentials: true,
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    }
    if (options && !options.headers) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
        withCredentials: true,
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    }

    const subs = new Subject<TRequestResponse<T>>();
    this._httpClinet.get<HttpResponse<T>>(url, options).subscribe({
      next: (response) => {
        const result: TRequestResponse<T> = {
          body: <T>response.body,
          status: response.status,
          isResult: true
        }
        subs.next(result);
        subs.complete();
      },
      error: (error) => {
        console.error(error);
        const result: TRequestResponse<T> = {
          body: undefined,
          status: 400,
          isResult: false
        }
        subs.next(result);
        subs.complete();
      }
    }).add(() => {
      subs.unsubscribe();
    });
    return subs;
  }

  /**
   * Post Method Request
   * @param uri 
   * @param urlParams 
   * @param isAnotherURL
   * @param options 
   * @returns 
   */
  public postRequest<T, P>(uri: string, urlParams: P, isAnotherURL = false, options?: TParameterBodyRequestOption): Subject<TRequestResponse<T>> {
    const url = isAnotherURL ? uri : environment.apiUrl + uri;
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        })
      };
      options.withCredentials = false;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }
    if (options && !options.headers) {
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      });
      options.withCredentials = true;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }

    const subs = new Subject<TRequestResponse<T>>();
    this._httpClinet.post<HttpResponse<T>>(url, urlParams, options).subscribe({
      next: (response) => {
        const result: TRequestResponse<T> = {
          body: <T>response.body,
          status: response.status,
          isResult: true
        }
        subs.next(result);
        subs.complete();
      },
      error: (error) => {
        console.error(error);
        const result: TRequestResponse<T> = {
          body: undefined,
          status: 400,
          isResult: false
        }
        subs.next(result);
        subs.complete();
      }
    }).add(() => {
      subs.unsubscribe();
    });
    return subs;
  }

  /**
   * Put Method Request
   * @param uri 
   * @param urlParams 
   * @param isAnotherURL
   * @param options 
   * @returns 
   */
  public putRequest<T, P>(uri: string, urlParams: P, isAnotherURL = false, options?: TParameterBodyRequestOption): Subject<TRequestResponse<T>> {
    const url = isAnotherURL ? uri : environment.apiUrl + uri;
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        })
      };
      options.withCredentials = false;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }
    if (options && !options.headers) {
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      });
      options.withCredentials = true;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }

    const subs = new Subject<TRequestResponse<T>>();
    this._httpClinet.put<HttpResponse<T>>(url, urlParams, options).subscribe({
      next: (response) => {
        const result: TRequestResponse<T> = {
          body: <T>response.body,
          status: response.status,
          isResult: true
        }
        subs.next(result);
        subs.complete();
      },
      error: (error) => {
        console.error(error);
        const result: TRequestResponse<T> = {
          body: undefined,
          status: 400,
          isResult: false
        }
        subs.next(result);
        subs.complete();
      }
    }).add(() => {
      subs.unsubscribe();
    });
    return subs;
  }

  /**
   * Patch Method Request
   * @param uri 
   * @param urlParams 
   * @param isAnotherURL
   * @param options 
   * @returns 
   */
  public patchRequest<T, P>(uri: string, urlParams: P, isAnotherURL = false, options?: TParameterBodyRequestOption): Subject<TRequestResponse<T>> {
    const url = isAnotherURL ? uri : environment.apiUrl + uri;
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        })
      };
      options.withCredentials = false;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }
    if (options && !options.headers) {
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      });
      options.withCredentials = true;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }

    const subs = new Subject<TRequestResponse<T>>();
    this._httpClinet.patch<HttpResponse<T>>(url, urlParams, options).subscribe({
      next: (response) => {
        const result: TRequestResponse<T> = {
          body: <T>response.body,
          status: response.status,
          isResult: true
        }
        subs.next(result);
        subs.complete();
      },
      error: (error) => {
        console.error(error);
        const result: TRequestResponse<T> = {
          body: undefined,
          status: 400,
          isResult: false
        }
        subs.next(result);
        subs.complete();
      }
    }).add(() => {
      subs.unsubscribe();
    });
    return subs;
  }

  /**
   * Delete Method Request
   * @param isAnotherURL
   * @param uri 
   * @param options 
   * @returns 
   */
  public deleteRequest<T>(uri: string, isAnotherURL = false, options?: TDeleteRequestOption): Subject<TRequestResponse<T>> { 
    const url = isAnotherURL ? uri : environment.apiUrl + uri;
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        })
      };
      options.withCredentials = false;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }
    if (options && !options.headers) {
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      });
      options.withCredentials = true;
      options.observe = 'response';
      options.reportProgress = false;
      options.responseType = 'json';
    }

    const subs = new Subject<TRequestResponse<T>>();
    this._httpClinet.delete<HttpResponse<T>>(url, options).subscribe({
      next: (response) => {
        const result: TRequestResponse<T> = {
          body: <T>response.body,
          status: response.status,
          isResult: true
        }
        subs.next(result);
        subs.complete();
      },
      error: (error) => {
        console.error(error);
        const result: TRequestResponse<T> = {
          body: undefined,
          status: 400,
          isResult: false
        }
        subs.next(result);
        subs.complete();
      }
    }).add(() => {
      subs.unsubscribe();
    });
    return subs;
  }
}
