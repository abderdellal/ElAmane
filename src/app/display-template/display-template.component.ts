import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';

import {Template} from '../models/Template'

@Component({
  selector: 'app-display-template',
  templateUrl: './display-template.component.html',
  styleUrls: ['./display-template.component.scss']
})
export class DisplayTemplateComponent implements OnInit {

  templateId : number;
  errorMsg : string = "";
  SelectedTemplate : Template; 

  constructor(private dataService : DataService, private route : ActivatedRoute) { 
    this.route.params.subscribe(params => this.templateId = params.id);
  }

  ngOnInit() {
    this.dataService.GetTemplate(this.templateId).subscribe(data => this.SelectedTemplate = data, error =>this.errorMsg = error);
  }

}
