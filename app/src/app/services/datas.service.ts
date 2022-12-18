import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasService {
  url = "http://localhost:8080/api/datas";

  constructor( private http: HttpClient) { 
    console.log("Servicio datas")
  }
  getDatas(){
    let header = new Headers().set('Type-content','application/json ')
    return this.http.get(this.url,)
  }
}
