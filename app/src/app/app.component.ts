import { Component } from '@angular/core';
import { DatasService } from './services/datas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public datas : Array<any> = []
  constructor(private datasService : DatasService){
    this.datasService.getDatas().subscribe((res:any)=>{
      console.log(res)
      this.datas = res

    })
  }
}
