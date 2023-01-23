import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
onClick1() {


  let sc = document.createElement('script');
  sc.src = 'assets/test.js';
  sc.type = 'text/javascript';
  sc.async = true;
  document.getElementsByTagName('head')[0].appendChild(sc);

  

  
}

 
  
}
