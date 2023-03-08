import { Component } from '@angular/core';
import { DatasService } from './services/datas.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuCollapsed = true;
  title = 'app';
  public datas : Array<any> = []
  constructor(private datasService : DatasService){
    this.datasService.getDatas().subscribe((res:any)=>{
      this.datas = res

    })
  }
}
