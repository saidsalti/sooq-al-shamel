import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared';
import { LookupService } from '@shared/services/lookup.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Query } from 'appwrite';
import { SectionsComponent } from '@shared/components/sections/sections.component';

@Component({
  selector: 'app-account-select-section',
  templateUrl: './select-section.component.html',
  styleUrl: './select-section.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SectionsComponent,
  ]
})
export class AccountSelectSectionComponent implements OnInit {
  private lookup = inject(LookupService);
  private router=inject(Router);
  childSections?: any;
  private searchSubject: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.getChildSections();
    this.initSearch();
  }

  async getChildSections(filter?: string[]) {
    this.childSections = (await this.lookup.parentSections(filter)).documents;

    const id = sessionStorage.getItem('_sgv');
    if(!id){
      this.router.navigate(['/account/select-g-section'])
    }else{
      this.childSections = (await this.lookup.getChildSections(id,filter)).documents;
    }
  }
  initSearch() {
    this.searchSubject
      .pipe(
        debounceTime(500), // تأخير لمدة 1 ثانية
        distinctUntilChanged() // التأكد من أن القيمة تغيرت قبل القيام بالبحث
      )
      .subscribe(searchTerm => {
        this.findSection(searchTerm);
      });
  }
  onSearchInput(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm); // إرسال القيمة إلى الـ Subject
  }

  findSection(searchTerm: string): void {
    let filter = [];
    if (searchTerm && searchTerm.length > 2) {
      filter.push(
        Query.or([Query.contains('name_ar', searchTerm), Query.contains('name_en', searchTerm)])
      );
      this.getChildSections(filter);
    } else {
      this.getChildSections();
    }
  }
  onSelectedValue(e:any){

    sessionStorage.setItem('_sv',e);
    this.router.navigate(['/account/add-adv'])

  }
}
