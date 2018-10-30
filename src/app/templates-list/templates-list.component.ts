import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute} from '@angular/router';

import {Template} from '../models/Template';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  public templates : Template[] = [];
  public errorMsg : string = "";

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.dataService.GetTemplatesList().subscribe(data => this.templates = data, error =>this.errorMsg = error);
  }

  deleteTemplate(template : Template){
    this.dataService.DeleteTemplate(template.id).subscribe(() => { 
      //best way to remove an item from an array in typescript
        let index = this.templates.indexOf(template);
        if (index > -1) {
          this.templates.splice(index, 1);
        }
        this.errorMsg = "";
    } 
    ,error => this.errorMsg = error);
  }
  
}
