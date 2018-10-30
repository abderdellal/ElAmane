import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AutoFillComponent } from './auto-fill/auto-fill.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { TemplatesListComponent} from './templates-list/templates-list.component';
import { AccountComponent} from './account/account.component'
import {DisplayTemplateComponent} from './display-template/display-template.component'
import { combineLatest } from 'rxjs';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path: 'AutoFill',
    component : AutoFillComponent
  },
  {
    path : 'Templates/new',
    component : EditTemplateComponent
  },
  {
    path : 'Templates/edit/:id',
    component : EditTemplateComponent
  },
  {
    path : 'Templates/:id',
    component : DisplayTemplateComponent
  },
  {
    path : 'Templates',
    component : TemplatesListComponent
  },
  {
    path : 'Account',
    component : AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
