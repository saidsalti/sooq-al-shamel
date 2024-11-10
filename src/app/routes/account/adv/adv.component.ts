import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-account-adv',
  templateUrl: './adv.component.html',
  styleUrl: './adv.component.scss',
  standalone: true,
  imports: [PageHeaderComponent,RouterModule,MatButtonModule]
})
export class AccountAdvComponent implements OnInit {

  router=inject(Router);
  constructor() { }

  ngOnInit() {
  }
  addNewAdv(e:any){
this.router.navigate(['/account/add-adv']);
  }
}
