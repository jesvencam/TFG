import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/dist';
import { DatasService } from '../services/datas.service';
 

@Component({
  selector: 'app-grafica-tarta',
  templateUrl: './grafica-tarta.component.html',
  styleUrls: ['./grafica-tarta.component.css']
})
export class GraficaTartaComponent {
  constructor(private dataService : DatasService) {  
  }
 
  dataPoints:any[] = [];  
  timeout:any = null;
  xValue:number = 1;
  yValue:number = 10;
  newDataCount:number = 10;
  chart: any;
  counter: number = 0;
 
  chartOptions = {
    theme: "light2",
    title: {
      text: "Gráfica dinámica con el número de identificaciones de cada ave"
    },
    data: [{
      type: "pie",
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
   public commonNames = new Map();

  addData = (data:any) => {
    
    for (var i in data){
      this.counter +=1;
      if(this.commonNames.has(data[i].commonName)){
        this.commonNames.set(data[i].commonName,(this.commonNames.get(data[i].commonName)+1));

      }else{
        this.commonNames.set(data[i].commonName,1);

      }

    }
    var k = 0;
    const keys = this.commonNames;
    for (let key of this.commonNames.keys()){
      this.dataPoints.push({label:key,y:this.commonNames.get(key)})
    }
    this.newDataCount = 1;
    this.chart.render();

  }
}                 