import { Component } from '@angular/core';
import { range } from 'rxjs';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.css']
})
export class GraficaBarrasComponent {
  constructor(private dataService : DatasService){
  }

 
  tipo:any="line";
  dataPoints:any[] = [];
  timeout:any = null;
  xValue:number = 1;
  yValue:number = 120;
  newDataCount:number = 120;
  chart: any;
 
  chartOptions = {
    theme: "light2",
    title: {
      text: "Gráfica dinámica de el número de registros por fecha y hora"
    },
    data: [{
      type: this.tipo,
      dataPoints: this.dataPoints
    }]
  }
 
  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }
 
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
 
  updateData = () => {
    this.dataService.getDatas().subscribe(this.addData) }
   public datetimes = new Map();

  addData = (data:any) => {
   for (var i in data){

        if(this.datetimes.has(data[i].datetime)){
          this.datetimes.set(data[i].datetime,(this.datetimes.get(data[i].datetime)+1));

        }else{
          this.datetimes.set(data[i].datetime,1);

        }

      }
      console.log(this.datetimes.size)
      var k = 0;
      const keys = this.datetimes;
      console.log("las keys",keys);
      for (let key of this.datetimes.keys()){
        console.log(key);
        this.dataPoints.push({label:key,y:this.datetimes.get(key)})
      }
      for(k;k<this.datetimes.size;k++){
        console.log("la k",k)
        console.log(this.datetimes.keys())
        // this.datas.push({label:keys[1],y:this.commonNames.get(k)});
      }

      console.log("los datas",this.dataPoints);
    if(this.tipo==""){
      this.tipo="pie";
    }
    this.newDataCount = 1;
    this.chart.render();
  }


}                 