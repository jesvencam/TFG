import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';


@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private dataService : DatasService){

    //Llamada a la funcion para cargar los datos al iniciar la pagina
    this.onClick1();
    
  } 

  //Funcion se encarga de activar el modelo en segundo plano desde el frontEnd.
  onClick1(){
    this.dataService.startProgram().subscribe((res:any)=>{
      console.log(res);
    

    })

  }


 
  
}
