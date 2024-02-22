import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../../apps/test-project/web-ui/src/environments/environment';
import { Router } from '@angular/router';

/**
 * Api is a generic REST API Service. Set your API url first.
 */
@Injectable({
  providedIn: 'root'
})
export class RestClientService {
  private url: string = environment.api.baseEndpoint;
  private localUrl: string = '/assets/mocks';

  public offlineException: EventEmitter<HttpErrorResponse> = new EventEmitter();
  public serverErrorException: EventEmitter<HttpErrorResponse> = new EventEmitter();

  constructor(
    private http: HttpClient,
    // private authService: NbAuthService,
    private router: Router,
    // public translate: TranslateService
  ) { }

  // getLocal<T>(endpoint: string): Promise<T> {
  //   return this.http.get<T>(this.localUrl + endpoint + ".json").toPromise<T>();
  // }

  async get<T>(endpoint: string, params?: any, reqOpts?: any, locale?: string): Promise<T> {
    const loc = locale || "it";
    if (!reqOpts || reqOpts == null) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders({
          'x-locale': loc
        })
      };
    } else if (locale) {
      reqOpts.headers = new HttpHeaders({
        'x-locale': loc
      });
    }

    // Support easy query params for GET requests
    reqOpts.params = new HttpParams();
    if (params) {
      for (let k in params) {
        if (params[k] != undefined && params[k] != null)
          reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + endpoint, reqOpts).toPromise().catch(error => {
      console.error("[GET] error", error?.status, error?.error?.error.code);
      if (error.status == 401 && ['TOKEN_MISSING', 'INVALID_TOKEN'].includes(error?.error?.error.code)) {
        this.router.navigate(['/auth/logout']);
      }
      else if (error.status == 0) {
        this.offlineException.emit(error);
      }
      else if (error.status >= 500) {
        this.serverErrorException.emit(error);
      }
      throw error;
    }) as unknown as Promise<T>;
  }

  // async get<T>(endpoint: string, params?: any, reqOpts?: any, locale?: string): Promise<T> {
  //   const loc = locale || this.translate.currentLang;
  //   const token = await this.authService.getToken().toPromise();
  //   if (!reqOpts || reqOpts == null) {
  //     reqOpts = {
  //       params: new HttpParams(),
  //       headers: new HttpHeaders({
  //         'Authorization': `Bearer ${token.getValue() || ''}`,
  //         'x-locale': loc
  //       })
  //     };
  //   } else if (locale) {
  //     reqOpts.headers = new HttpHeaders({
  //       'x-locale': loc
  //     });
  //   }

  //   // Support easy query params for GET requests
  //   reqOpts.params = new HttpParams();
  //   if (params) {
  //     for (let k in params) {
  //       if (params[k] != undefined && params[k] != null)
  //         reqOpts.params = reqOpts.params.set(k, params[k]);
  //     }
  //   }

  //   return this.http.get(this.url + endpoint, reqOpts).toPromise().catch(error => {
  //     console.error("[GET] error", error?.status, error?.error?.error.code);
  //     if (error.status == 401 && ['TOKEN_MISSING', 'INVALID_TOKEN'].includes(error?.error?.error.code)) {
  //         this.router.navigate(['/auth/logout']);
  //     }
  //     else if (error.status == 0) {
  //       this.offlineException.emit(error);
  //     }
  //     else if (error.status >= 500) {
  //       this.serverErrorException.emit(error);
  //     }
  //     throw error;
  //   }) as unknown as Promise<T>;
  // }

  // async post(endpoint: string, body: any, httpParams?: HttpParams): Promise<any> {
  //   const token = await this.authService.getToken().toPromise();
  //   const reqOpts = {
  //     params: new HttpParams(),
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token.getValue() || ''}`,
  //       'x-locale' : this.translate.currentLang
  //     })
  //   };

  //   reqOpts.params = httpParams || new HttpParams();

  //   return this.http.post(this.url + endpoint, body, reqOpts).toPromise()
  //     .catch((error) => {
  //       console.log("[POST] error", error);
  //       if (error.status == 401 && ((error.error || {}).error || {}).code == 'INVALID_TOKEN') {
  //       } else if (error.status == 0) {
  //         this.offlineException.emit(error);
  //       } else if (error.status >= 500) {
  //         this.serverErrorException.emit(error);
  //       }
  //       throw error;
  //     });
  // }

  // async put(endpoint: string, body: any, httpParams?: HttpParams): Promise<any> {
  //   const token = this.authService.getToken();
  //   const h: any = {
  //     'Content-Type': 'application/json',
  //     'x-locale': "it"
  //   }
  //   if (token) {
  //     h['Authorization'] = `Bearer ${token || ''}`
  //   }
  //   const reqOpts = {
  //     params: new HttpParams(),
  //     headers: new HttpHeaders(h)
  //   };

  //   reqOpts.params = httpParams || new HttpParams();

  //   return this.http.put(this.url + endpoint, body, reqOpts).toPromise()
  //     .catch((error) => {
  //       console.log("[PUT] error", error);
  //       if (error.status == 401 && ((error.error || {}).error || {}).code == 'INVALID_TOKEN') {
  //       } else if (error.status == 0) {
  //         this.offlineException.emit(error);
  //       } else if (error.status >= 500) {
  //         this.serverErrorException.emit(error);
  //       }
  //       throw error;
  //     });
  // }

  // async patch(endpoint: string, body: any, httpParams?: HttpParams): Promise<any> {
  //   const token = this.authService.getToken();
  //   const h: any = {
  //     'Content-Type': 'application/json',
  //     'x-locale': "it"
  //   }
  //   if (token) {
  //     h['Authorization'] = `Bearer ${token || ''}`
  //   }
  //   const reqOpts = {
  //     params: new HttpParams(),
  //     headers: new HttpHeaders(h)
  //   };

  //   reqOpts.params = httpParams || new HttpParams();

  //   return this.http.patch(this.url + endpoint, body, reqOpts).toPromise()
  //     .catch((error) => {
  //       console.log("[PUT] error", error);
  //       if (error.status == 401 && ((error.error || {}).error || {}).code == 'INVALID_TOKEN') {
  //       } else if (error.status == 0) {
  //         this.offlineException.emit(error);
  //       } else if (error.status >= 500) {
  //         this.serverErrorException.emit(error);
  //       }
  //       throw error;
  //     });
  // }

  // async delete<T>(endpoint: string, params?: any, reqOpts?: any, locale?: string): Promise<T> {
  //   const loc = locale || "it";
  //   const token = this.authService.getToken();
  //   const h: any = {
  //     'x-locale': loc
  //   }
  //   if (token) {
  //     h['Authorization'] = `Bearer ${token || ''}`
  //   }
  //   if (!reqOpts || reqOpts == null) {
  //     reqOpts = {
  //       params: new HttpParams(),
  //       headers: new HttpHeaders(h)
  //     };
  //   } else if (locale) {
  //     reqOpts.headers = new HttpHeaders({
  //       'x-locale': loc
  //     });
  //   }

  //   // Support easy query params for GET requests
  //   reqOpts.params = new HttpParams();
  //   if (params) {
  //     for (let k in params) {
  //       if (params[k] != null) reqOpts.params = reqOpts.params.set(k, params[k]);
  //     }
  //   }

  //   return this.http.delete(this.url + endpoint, reqOpts).toPromise()
  //     .catch(error => {
  //       console.error("[DELETE] error", error);
  //       if (error.status == 401 && ((error.error || {}).error || {}).code == 'INVALID_TOKEN') {
  //         this.router.navigate(['/auth/logout']);
  //       }
  //       else if (error.status == 0) {
  //         this.offlineException.emit(error);
  //       }
  //       else if (error.status >= 500) {
  //         this.serverErrorException.emit(error);
  //       }
  //       throw error;
  //     }) as unknown as Promise<T>;
  // }

  // upload(endpoint: string, form: FormData) {
  //   return this.authService.getToken()
  //     .pipe(switchMap(token => this.http.request(new HttpRequest('POST', this.url + endpoint, form, {
  //       reportProgress: true,
  //       headers: new HttpHeaders({
  //         'Authorization': `Bearer ${token.getValue() || ''}`
  //       })
  //     }))));
  // }

}


