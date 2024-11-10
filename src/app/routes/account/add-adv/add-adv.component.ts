import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { PageHeaderComponent } from '@shared';
import { AdvModel } from './adv.model';
import { LookupService } from '@shared/services/lookup.service';
import { ScreenService } from '@shared/services/screen.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Query } from 'appwrite';
import { SectionsComponent } from '@shared/components/sections/sections.component';
import { ToastService } from '@shared/services/mat.toust.service';
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SectionsComponent,

  ],
})
export class AccountAddAdvComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private lookup = inject(LookupService);
  private screenService = inject(ScreenService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  form = new FormGroup({});
  model: AdvModel = {};

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
          },
          hooks: {
            onInit: async (field: FormlyFieldConfig) => {
              const options = await this.lookup.loadMakesOptions('ar');
              field.props!.options=options;
              if (field.formControl && this.model.make) {
                const selectedOption = options.find(option => option.value === this.model.make);
                if (selectedOption) {
                  field.formControl.setValue(selectedOption.value);
                }
              }
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

  ngOnInit() {
    const id = sessionStorage.getItem('_sv');
    if (!id) {
      this.router.navigate(['/account/select-section']);
    }
    this.getmodel();
  }
  getmodel(){
    var modelStr = sessionStorage.getItem('__adv__model');
    if(modelStr){
      this.model=JSON.parse(modelStr);
    }
  }
  submit() {

    if(!this.form.valid){
      this.toastService.error('يرجى التحقق من البيانات المدخلة');
     return;
    }

      sessionStorage.setItem('__adv__model',JSON.stringify(this.form.value));
      this.router.navigate(['/account/adv-images'])
  }

  onCancel(e:any){

  }
}
