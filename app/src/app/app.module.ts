import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TablasComponent } from './tablas/tablas.component';
import { HomeComponent } from './home/home.component';

const appRoutes = [
  {path: '', component:HomeComponent},
  {path:'tables',component : TablasComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TablasComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
