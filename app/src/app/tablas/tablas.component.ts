import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent {
  public datas : Array<any> = [];
  constructor(private dataService : DatasService){
    this.dataService.getDatas().subscribe((res:any)=>{
      console.log(res);
      this.datas = res;
    })
  }

}
