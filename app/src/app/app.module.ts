import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TablasComponent } from './tablas/tablas.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocsComponent } from './docs/docs.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TablaBirdComponent } from './tabla-bird/tabla-bird.component';
import { TablaDatasComponent } from './tabla-datas/tabla-datas.component'; // <-- import the module


const appRoutes = [
  {path: '', component:HomeComponent},
  {path:'tables',component : TablasComponent},
  {path:'docs',component:DocsComponent},
  {path:'tables/tablabird',component:TablaBirdComponent},
  {path:'tables/tabladatas',component:TablaDatasComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TablasComponent,
    HomeComponent,
    DocsComponent,
    TablaBirdComponent,
    TablaDatasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
