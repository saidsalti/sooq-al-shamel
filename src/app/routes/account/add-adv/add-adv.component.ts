import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { PageHeaderComponent } from '@shared';
import { AdvModel } from './adv.model';
import { LookupService } from '@shared/services/lookup.service';
import { distinctUntilChanged, from, map, Observable, startWith, switchMap } from 'rxjs';
import { ScreenService } from '@shared/services/screen.service';
import { AdvService } from '../adv/adv.service';
interface OptionType {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-account-add-adv',
  templateUrl: './add-adv.component.html',
  styleUrl: './add-adv.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
})
export class AccountAddAdvComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private lookup = inject(LookupService);
  private screenService =inject(ScreenService);
  form = new FormGroup({});
  model: AdvModel = {};
  makeOptions: any = [];
  id?: string;
  ratio = this.screenService.isMobile()?'2:1': '2:1';
  cols=this.screenService.isMobile()?2:4;
  parentSections?:any;
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'title',
          props: {
            label: 'العنوان',
            required: true,
            maxLength: 70,
          },
        },

        {
          className: 'col-sm-6',
          type: 'number',
          key: 'price',
          props: {
            label: 'السعر',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'select',
          key: 'make',
          props: {
            label: 'المصنع',
            required: true,
            // options: from(this.getOptionsAsObservable()),
          },
          hooks: {
            onInit: async (field: FormlyFieldConfig) => {
              field.props!.options = await this.lookup.loadMakesOptions('ar');
            },
          },
        },
        {
          className: 'col-sm-6',
          type: 'select',
          key: 'model',
          props: {
            label: 'المودل',
            required: true,
            options: [],
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              const makeControl = field.parent!.get!('make').formControl;
              makeControl?.valueChanges.subscribe(async val => {
                field!.props!.options = await this.lookup.loadModelsOptions(val, 'ar');
              });
            },
          },
        },
        {
          className: 'col-sm-6',
          type: 'textarea',
          key: 'description',
          props: {
            label: 'الوصف',
            required: true,
            maxLength: 500,
            rows: 5,
          },
        },
      ],
    },
  ];

  getId() {
    this.activatedRoute.paramMap.subscribe(s => {
      this.id = s.get('id')!;
    });
  }
  async ngOnInit() {
  const sections= await this.lookup.parentSections();
  this.parentSections=sections.documents;
  }

  submit() {}
}
