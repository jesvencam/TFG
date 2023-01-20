import { Component } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent {
  page = 4;

  public datas : Array<any> = [];
  constructor(private dataService : DatasService){
    this.dataService.getDatas().subscribe((res:any)=>{
      console.log(res);
      this.datas = res;
    })
  }

}
