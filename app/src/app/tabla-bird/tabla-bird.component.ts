import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';
import {NgbModal, ModalDismissReasons} 
      from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../services/spinner.service';
@Component({
  selector: 'app-tabla-bird',
  templateUrl: './tabla-bird.component.html',
  styleUrls: ['./tabla-bird.component.css']
})
export class TablaBirdComponent {
  closeResult = '';
  dt : any;
  dataDisplay : any;

  searchText="";


  //Numero de pagina inicial (paginacion)
  p: number = 1;

  public datas : Array<any> = [];
  public birds : Array<any> = [];
  public birdInfo : any;
  public birdInformation : any ; 
  public birdPhotoUrl : any;
  public birdSoundUrl : any; 

  constructor(private dataService : DatasService, private modalService : NgbModal, private spinnerService : SpinnerService){
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

  async onInfoBird(content: any, arg0 : any) {
    console.log("En el infoBird")
    this.dataService.getInfoBird(arg0).subscribe((res : any)=>{
      this.birdInfo = arg0;
      console.log("los datos de la consulta",res);
      var c = JSON.parse(JSON.stringify(res));
      console.log(res.Information);
      // this.birdInfo.push(res.Information,res.URL,res.AudioFile)
      this.birdInformation = res.Information;
      this.birdPhotoUrl = res.URL;
      this.birdSoundUrl = res.AudioFile; 
      if (res) {
        this.hideloader();
        this.open(content);
  
    }
    })

  
    
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
