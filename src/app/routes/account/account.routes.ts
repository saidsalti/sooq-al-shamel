import { Routes } from '@angular/router';
import { AccountAdvComponent } from './adv/adv.component';
import { AccountAddAdvComponent } from './add-adv/add-adv.component';

export const routes: Routes = [{ path: 'adv', component: AccountAdvComponent },
{ path: 'add-adv', component: AccountAddAdvComponent },
{ path: 'add-adv/:id', component: AccountAddAdvComponent }

];
