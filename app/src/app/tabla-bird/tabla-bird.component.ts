import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';
//import {MatDialog} from '@angular/material'; 

@Component({
  selector: 'app-tabla-bird',
  templateUrl: './tabla-bird.component.html',
  styleUrls: ['./tabla-bird.component.css']
})
export class TablaBirdComponent {


  //Numero de pagina inicial (paginacion)
  p: number = 1;

  public datas : Array<any> = [];
  public birds : Array<any> = [];
  public birdInfo : JSON | undefined;
  constructor(private dataService : DatasService){

    //Llamada a la funcion para cargar los datos al iniciar la pagina
    this.onBirds();
    
  } 

  //Funcion que llama a la funcion del servicio que se encarga de coger los datos de aves de la api 
  onBirds(){
    this.dataService.getBirds().subscribe((res2:any)=>{
      console.log(res2);
      this.birds = res2;

    })

  }

  onInfoBird(arg0: any) {
    this.dataService.getInfoBird(arg0).subscribe((res : any)=>{
      console.log(res);
      this.birdInfo = res;
    })
  }
  
}
