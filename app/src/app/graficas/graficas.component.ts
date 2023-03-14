import { Component} from '@angular/core';
import { DatasService } from '../services/datas.service';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent{
  constructor(private dataService : DatasService){
  }


}
