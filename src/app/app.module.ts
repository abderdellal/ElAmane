import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AutoFillComponent } from './auto-fill/auto-fill.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { DisplayTemplateComponent } from './display-template/display-template.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AutoFillComponent,
    TemplatesListComponent,
    AccountComponent,
    HomeComponent,
    EditTemplateComponent,
    DisplayTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
