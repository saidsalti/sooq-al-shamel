import { Component, OnInit, inject } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { PageHeaderComponent } from '@shared';
import { LookupService } from '@shared/services/lookup.service';
import { ScreenService } from '@shared/services/screen.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ID, Query } from 'appwrite';
import { SectionsComponent } from '@shared/components/sections/sections.component';

@Component({
  selector: 'app-account-select-g-section',
  templateUrl: './select-g-section.component.html',
  styleUrl: './select-g-section.component.scss',
  standalone: true,
 imports: [
    PageHeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SectionsComponent,
  ]
})
export class AccountSelectGSectionComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private lookup = inject(LookupService);
  private screenService = inject(ScreenService);
  private router=inject(Router);
  parentSections?: any;
  private searchSubject: Subject<string> = new Subject<string>();
  private advId=ID.unique();
  ngOnInit() {
    this.getParentSections();
    this.initSearch();
  }

  async getParentSections(filter?: string[]) {
    this.parentSections = (await this.lookup.parentSections(filter)).documents;
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
      this.getParentSections(filter);
    } else {
      this.getParentSections();
    }
  }
  onSelectedValue(e:any){
    console.log(e);
    sessionStorage.setItem('_sgv',e);
    this.router.navigate(['/account/select-section'])

  }
}
