import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';


import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AuthResult } from './auth-result.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedIdToken: any;
  private userApplications: string[];

  constructor(
    public router: Router,
    private http: HttpClient,

  ) { }


 isAuthenticated(): boolean | null {
    return this.getAccessToken() ? true :  false;
  }
  getAccessToken(): boolean | null {
    return localStorage.getItem('$a$t') ? true :  false;
  }

  getIdToken(): string {
    return localStorage.getItem('$i$t');
  }

  // getUserRoles(): string[] {
  //   if (!this.decodedIdToken
  //     || (this.decodedIdToken && Object.keys(this.decodedIdToken).length === 0)) {
  //     this.decodedIdToken = this.decodeIdToken();
  //   }
  //   return this.decodedIdToken['cognito:groups'];
  // }

  // getUsername(): string {
  //   if (!this.decodedIdToken
  //     || (this.decodedIdToken && Object.keys(this.decodedIdToken).length === 0)) {
  //     this.decodedIdToken = this.decodeIdToken();
  //   }
  //   return this.decodedIdToken['cognito:username'];
  // }

  // getUserApplications(): Observable<string[]> {
  //   const username = this.getUsername();

  //   if (this.userApplications) {
  //     return of(this.userApplications);
  //   }

  //   return this.http.get(`${environment.appUrl}/${username}/applications`)
  //     .map(res => {
  //       this.userApplications = res as string[];
  //       return this.userApplications;
  //     }).catch((err) => {
  //       console.log(err);
  //       this.signOut();
  //       return of([]);
  //     });
  // }

  isAuthorized(): boolean {
    return !!this.getAccessToken();
  }

  // decodeIdToken(): any {
  //   const idToken = this.getIdToken();
  //   try {
  //     return jwt_decode(idToken);
  //   } catch (error) {
  //     console.log(error);
  //     this.signOut();
  //   }
  // }

  // canAccess(appCode: string): Observable<boolean> {
  //   const len = appCode.length + 1;
  //   return this.getUserApplications().map(applications => {
  //     return applications && applications.length
  //       && applications.some(app => appCode.toLowerCase().indexOf(app.toLowerCase()) !== -1
  //       );
  //   });
  // }

  clearToken(): void {
    localStorage.removeItem('$a$t');
    localStorage.removeItem('$r$t');
    localStorage.removeItem('$i$t');
    localStorage.removeItem('$h$c');
    localStorage.removeItem('au$#n');
  }

  _storeTokens(authRes: AuthResult): void {
    localStorage.setItem('$a$t', authRes.accessToken);
    localStorage.setItem('$r$t', authRes.refreshToken);
    localStorage.setItem('$i$t', authRes.idToken);
    localStorage.setItem('$h$c', authRes.homeClientId);
  }

  _resetLogin(): Observable<any> {
    this.clearToken();
    this.decodedIdToken = null;
    return of(true);
  }

  // signOut(): void {
  //   this._resetLogin().map(() => this.router.navigate(['/login']))
  //     .catch((err) => {
  //       console.log(err);
  //       this.router.navigate(['/login']);
  //       return null;
  //     }).subscribe();
  // }

  login(loginCred:{username: string, password: string}) {
    const loginSubject = new Subject();

    this.http.post(
      environment.authUrl + '',
      loginCred
    )
      .subscribe((res: AuthResult) => {
        
        if (res && res.accessToken) {
          this._storeTokens(res);
          
          // this.decodedIdToken = this.decodeIdToken();
          loginSubject.next();
        } else {
         
          loginSubject.error(res && res.errorMessage || 'Error!');
        }
      });
      
    return loginSubject;
  }

  // clearSessionTransferRec(transferId: string): Observable<boolean> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   return this.http.post(`${environment.authUrl}/cstt`, JSON.stringify(transferId), { headers: headers })
  //     .map(() => true)
  //     .catch((err) => {
  //       console.log(err);
  //       return of(false);
  //     });
  // }

  // transferSession(transferId: string): Observable<boolean> {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    // return this._resetLogin().mergeMap(() => {
    //   return this.http.post(
    //     `${environment.authUrl}/stt`, JSON.stringify(transferId), { headers: headers }
    //   ).mergeMap((res: AuthResult) => {
    //     if (res && res.accessToken) {
    //       this._storeTokens(res);
    //       this.decodedIdToken = this.decodeIdToken();
    //       return this.clearSessionTransferRec(transferId);
    //     }
    //     return of(false);
    //   });
    // });
  // }

}
