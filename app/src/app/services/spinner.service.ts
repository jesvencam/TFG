import { Injectable } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService : NgxSpinnerService) { }


  public runSpinner(){
    this.spinnerService.show()
  }

  public stopSpinner(){
    this.spinnerService.hide();
  }
}
