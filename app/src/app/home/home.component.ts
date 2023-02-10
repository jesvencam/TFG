import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

onClick1() {


  let sc = document.createElement('script');
  sc.src = 'assets/test.js';
  sc.type = 'text/javascript';
  sc.async = true;
  document.getElementsByTagName('head')[0].appendChild(sc);

  

  
}

 
  
}
