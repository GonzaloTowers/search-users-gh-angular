import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class Search {
  baseUrl: string = 'https://api.github.com/search/users?q=';
  queryUrl: string = 'https://api.github.com/users/';

  constructor(private http: Http) { }

  searchByUserName(userName: string) {
    if (userName) {
        const url = `${this.baseUrl}${userName}`;
        return this.http.get(url)
        /*.map((res: Response) => res.json())*/
        .map(this.extractData)
        .catch(this.catchError);
    }
  }

  getUserDetails(userName: string) {
    if (userName) {
        const url = `${this.queryUrl}${userName}`;
        return this.http.get(url)
        .map((res: Response) => res.json())
        /*.map(this.extractData)*/
        .catch(this.catchError);
    }
  }

  getRepositories(userName: string){
      if(userName){
          const url = `${this.queryUrl}${userName}/repos`;
          return this.http.get(url)
          .map((res: Response) => res.json())
          .catch(this.catchError);
      }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.items || {};
  }

  private catchError(error: Response | any){
      let errorMessage: string;
      if(error instanceof Response){
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
      }else{
          errorMessage = error.message ? error.message : error.toString();
      }
      console.error(errorMessage);
      return Observable.throw(errorMessage);
  }
}