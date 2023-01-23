import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-tabla-datas',
  templateUrl: './tabla-datas.component.html',
  styleUrls: ['./tabla-datas.component.css']
})
export class TablaDatasComponent {

  //Número de página inicial (paginacion)
  p: number = 1;

  public datas : Array<any> = [];
  public birds : Array<any> = [];

  constructor(private dataService : DatasService){

    //Llamamos al método para que se cargen los datos automaticamente al iniciar la página 
    this.onDatas();
    
  }

  //Funcion para llamar a la funcion getDatas del servicio de datos y coger los datos de los registros de la api 
  onDatas(){

    this.dataService.getDatas().subscribe((res:any)=>{
      console.log(res);
      this.datas = res;

    })

  }

  //Funcion para llamar a la funcion del servicio dandole como param el id de un registro para eliminarlo.
  onDelete(arg0: any) {

    this.dataService.deleteData(arg0).subscribe();

    //Recagamos la página tras eliminar el dato 
    window.location.reload();

    }
}
