import { Routes } from '@angular/router';
import { AccountAdvComponent } from './adv/adv.component';
import { AccountAddAdvComponent } from './add-adv/add-adv.component';
import { AccountSelectSectionComponent } from './select-section/select-section.component';
import { AccountSelectGSectionComponent } from './select-g-section/select-g-section.component';
import { AccountAdvImagesComponent } from './adv-images/adv-images.component';

export const routes: Routes = [{ path: 'adv', component: AccountAdvComponent },
{ path: 'add-adv', component: AccountAddAdvComponent },
{ path: 'add-adv/:id', component: AccountAddAdvComponent },
{ path: 'select-section', component: AccountSelectSectionComponent },
{ path: 'select-g-section', component: AccountSelectGSectionComponent },
{ path: 'adv-images', component: AccountAdvImagesComponent }
];
