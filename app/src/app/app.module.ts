import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TablasComponent } from './tablas/tablas.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocsComponent } from './docs/docs.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TablaBirdComponent } from './tabla-bird/tabla-bird.component';
import { TablaDatasComponent } from './tabla-datas/tabla-datas.component'; 
import { ColorPickerModule } from 'ngx-color-picker';
import { NgChartsModule } from 'ng2-charts';
import { InfoBirdsComponent } from './info-birds/info-birds.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';
import { GraficasComponent } from './graficas/graficas.component';


import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';
import { GraficaTartaComponent } from './grafica-tarta/grafica-tarta.component';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

const appRoutes = [
  {path: '', component:HomeComponent},
  {path:'tables',component : TablasComponent},
  {path:'docs',component:DocsComponent},
  {path:'tables/tablabird',component:TablaBirdComponent},
  {path:'tables/tabladatas',component:TablaDatasComponent},
  {path:'infoBirds',component:InfoBirdsComponent},
  {path:'graficas',component:GraficasComponent},
  {path:'graficaBarras',component:GraficaBarrasComponent},
  {path:'graficaTarta',component:GraficaTartaComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    TablasComponent,
    HomeComponent,
    DocsComponent,
    TablaBirdComponent,
    TablaDatasComponent,
    InfoBirdsComponent,
    GraficasComponent,
    CanvasJSChart,
    GraficaBarrasComponent,
    GraficaTartaComponent,
    SearchPipe

  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    NgxPaginationModule,
    ColorPickerModule,
    NgChartsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
