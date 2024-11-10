import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SectionCardComponent } from '../section-card/section-card.component';
import { MatCardModule } from '@angular/material/card';
import { ScreenService } from '@shared/services/screen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  standalone:true,
  imports:[CommonModule,SectionCardComponent,MatCardModule]
})
export class SectionsComponent implements OnInit {
@Input({required:true})values?:any;
@Input({required:true})valueField?:any;
@Input({required:true}) displayField?:string;
@Input()imageUrlField?:string;
@Input({required:true})redirectpath?:string;
@Output() selectedValue=new EventEmitter<any>();
justify_content='start';
secreen=inject(ScreenService);
  constructor() { }

  ngOnInit() {
  }

  onSelectdValue(e:any){
    this.selectedValue.emit(e);
  }
  initScreen(){

  }
}
