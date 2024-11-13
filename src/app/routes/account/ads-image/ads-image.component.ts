import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-account-ads-image',
  templateUrl: './ads-image.component.html',
  styleUrl: './ads-image.component.scss',
  standalone: true,
  imports: [PageHeaderComponent,CommonModule,MatCardModule]
})
export class AccountAdsImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onFileSelected(e:Event){

  }
}
