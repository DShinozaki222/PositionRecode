import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export type TDeleteRequestOption = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  context?: HttpContext;
  observe?: any;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any | null;
}