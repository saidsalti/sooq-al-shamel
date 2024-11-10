import { Component, EventEmitter, inject, Input, OnInit, Output ,HostListener} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ScreenService } from '@shared/services/screen.service';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css'],
  standalone:true,
  imports:[MatCardModule]
})
export class SectionCardComponent implements OnInit {

  @Input({required:true}) title:string='';
  @Input({required:true}) value:any='';
  @Input() imageUrl:string='';
  @Input({required:true})  redirectPath?:string;
  @Output() selectedValue=new EventEmitter<any>();

  secreen = inject(ScreenService);
  width=160;
  height=120;
  ngOnInit() {
    this.initSecreen();

  }
  onCardClick(value:any){
    this.selectedValue.emit(value);
  }

  initSecreen(){
    if(this.secreen.isMobile()){
      this.width=80,
      this.height=60
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    this.initSecreen();
  }

}
