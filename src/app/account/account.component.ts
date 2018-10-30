import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs'

import {Profile} from '../models/Profile'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  profile : Profile;
  errorMsg: string = "";
  editing: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetProfile().subscribe(data => this.profile = data, error => this.errorMsg = error);
  }

  SaveProfile()
  {
    this.dataService.SaveProfile(this.profile).subscribe(
      () => {this.editing = false; }
      , error => this.errorMsg = error);
  }

}
