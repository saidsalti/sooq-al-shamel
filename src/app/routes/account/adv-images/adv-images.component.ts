import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-account-adv-images',
  templateUrl: './adv-images.component.html',
  styleUrl: './adv-images.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class AccountAdvImagesComponent implements OnInit {
router=inject(Router);
  model?:any;

  ngOnInit() {
    this.getmodel();
  }
  getmodel(){
    var modelStr = sessionStorage.getItem('__adv__model');
    if(!modelStr){
      this.router.navigate(['/account/add-adv'])
    }else{
      this.model=JSON.parse(modelStr);
    }
  }

}
