import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export type TGetRequestOption = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  context?: HttpContext;
  observe?: any;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}