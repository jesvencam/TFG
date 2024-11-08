import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  //Urls de la api
  urlDatas = "http://localhost:8080/api/datas";
  urlBirds = "http://localhost:8080/api/birds";
  urlProgram = "http://localhost:8080/api/pruebaDeBoton";
  urlBirdInfo = "http://localhost:8080/api/birdInfo";
  
  constructor( private http: HttpClient) { 
    console.log("Servicio datas")

    //Establecemos la cabecera 
    let header = new Headers().set('Type-content','application/json ')

  }

  //Función para coger los datos de los registros
  getDatas(){
    return this.http.get(this.urlDatas,)
  }

  //Función para coger los datos de aves
  getBirds(){
    return this.http.get(this.urlBirds,)
  }

  startProgram(){
    console.log("En el servicio de datos.."); 
    return this.http.get(this.urlProgram,)
  }

  //Función para eliminar datos de registros por su id 
  deleteData(id:number){
    this.urlDatas = `${this.urlDatas}/${id}`; 
    return this.http.delete(this.urlDatas,)

  }

  getInfoBird(birdName: String){
    this.urlBirdInfo = `${this.urlBirdInfo}/${birdName}`
    return this.http.get(this.urlBirdInfo,);
  }

  ngOnInit() : void{
    this.getDatas();
  }
}
