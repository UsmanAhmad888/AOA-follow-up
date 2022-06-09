import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl
  fetchAOC(guid) {
    return this.http.get(this.baseUrl + `/api/DtpRequest/${guid}`, { headers: this.getAuthToken() })
  }

  private getAuthToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('$a$t')
    });
  }

  updateContact(payload) {
    return this.http.post(this.baseUrl + `/api/DtpRequest/hcpContact/update`, payload, {
      headers: this.getAuthToken()
    })
  }

  addComment(payload) {
    return this.http.post(this.baseUrl + `/api/DtpRequest/comment`, payload, {
      headers: this.getAuthToken()
    })
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
