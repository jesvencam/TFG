import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tabla-datas',
  templateUrl: './tabla-datas.component.html',
  styleUrls: ['./tabla-datas.component.css']
})
export class TablaDatasComponent {

  //Número de página inicial (paginacion)
  p: number = 1;
  closeResult = '';
  dt : any;
  dataDisplay : any;


  searchText="";
  public id_data : any ; 
  public datas : Array<any> = [];

  constructor(private dataService : DatasService, private modalService : NgbModal){

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
  openModal(content:any, arg0: any) {

    //Llamamos al modal para confirmar que quiere eliminar el dato

    this.id_data = arg0;
    this.open(content);

    }

  onDelete(arg0 : any){

    this.dataService.deleteData(arg0).subscribe((res:any) =>{
      console.log(res.status);
    });

    //Recagamos la página tras eliminar el dato 
    window.location.reload();
  }





    hideloader() {
      const elem = document.getElementById("loading");
      //document.getElementById('loading').style.display = 'none';
  }
  
    open(content: any) {
      console.log("en el open")
      this.modalService.open(content,
     {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=> {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = 
           `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    
  
    closeModal(){
      window.location.reload();
    }
}
