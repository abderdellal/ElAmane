import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';

import { Template } from '../models/Template';
import { KeyColumnPair } from '../models/KeyColumnPair';
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  templateId: number;
  errorMsg: string = "";
  SelectedTemplate: Template;
  IsANewTemplate: boolean;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.templateId = params.id);
  }

  ngOnInit() {
    if (this.templateId > -1) {
      this.dataService.GetTemplate(this.templateId).subscribe(data => this.SelectedTemplate = data, error => this.errorMsg = error);
      this.IsANewTemplate = false;
    }
    else {
      this.SelectedTemplate = new Template();
      this.SelectedTemplate.keyColumnPairs = new Array<KeyColumnPair>();
      this.SelectedTemplate.name = "";
      this.SelectedTemplate.SearchColumn = 1;
      this.IsANewTemplate = true;
    }
  }

  SaveTemplate() {
    if (!this.IsANewTemplate) {
      this.dataService.SaveTemplate(this.SelectedTemplate).subscribe(
        () => { this.router.navigate(["/Templates"]); }
        , error => this.errorMsg = error);
    }
    else{
      this.dataService.SaveNewTemplate(this.SelectedTemplate).subscribe(
        () => { this.router.navigate(["/Templates"]); }
        , error => this.errorMsg = error);
    }
  }

  AddPair()
  {
    let pair = new KeyColumnPair();
    pair.key = "";
    pair.column = 0;
    this.SelectedTemplate.keyColumnPairs.push(pair);
  }
}
