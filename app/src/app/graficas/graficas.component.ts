import { Component} from '@angular/core';
import { DatasService } from '../services/datas.service';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent{
  constructor(private dataService : DatasService){
    this.loadDatas();
  }

  public datas : Array<any> = [];
  public dataPoints : Array<any> = [];

  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "line",
      dataPoints:this.datas
    }]
			
  };

  loadDatas(){
    this.getDatas();

  }
  getDatas(){
    console.log("En el get data");
    this.dataService.getDatas().subscribe((res:any)=>{
      this.datas;
      var commonNames: Array<any> = [];
      for (var i in res){
        if(!(res[i].commonName in commonNames)){
          this.datas.push({label : res[i].commonName, y: parseInt(res[i].confidence) });
        }

        
        
      }

      console.log(this.datas);
    }
    );
  }


  // dataPoints:any[] = [];
  // timeout:any = null;
  // xValue:number = 1;
  // yValue:number = 10;
  // newDataCount:number = 10;
  // chart: any;
 
  // chartOptions = {
  //   theme: "light2",
  //   title: {
  //     text: "Live Data"
  //   },
  //   data: [{
  //     type: "line",
  //     dataPoints: this.dataPoints
  //   }]
  // }
 
  // getChartInstance(chart: object) {
  //   this.chart = chart;
  //   this.updateData();
  // }
 
  // ngOnDestroy() {
  //   clearTimeout(this.timeout);
  // }
 
  // updateData = () => {
  //   this.dataService.getDatas().subscribe(this.addData);
  // }
 
  // addData = (data:any) => {
  //   if(this.newDataCount != 1) {
  //     data.forEach( (val:any[]) => {
  //       this.dataPoints.push({x: val[0], y: parseInt(val[1])});
  //       this.xValue++;
  //       this.yValue = parseInt(val[1]);  
  //     })
  //   } else {
  //     //this.dataPoints.shift();
  //     this.dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
  //     this.xValue++;
  //     this.yValue = parseInt(data[0][1]);  
  //   }
  //   this.newDataCount = 1;
  //   this.chart.render();
  //   this.timeout = setTimeout(this.updateData, 1000);
  // }
  


}
