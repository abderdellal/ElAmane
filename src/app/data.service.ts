import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Template } from './models/Template'
import {Profile} from './models/Profile'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _templatesUrl = 'http://localhost:3000/Templates'
  private _profileUrl = 'http://localhost:3000/Profile'

  constructor(private http: HttpClient) {}

  GetProfile()
  {
    return this.http.get<Profile>(this._profileUrl).pipe(catchError(this.OnHttpError));
  }

  SaveProfile(p:Profile)
  {
    return this.http.put<Profile>(this._profileUrl, p).pipe(catchError(this.OnHttpError));;
  }

  GetTemplatesList(){
    return this.http.get<Template[]>(this._templatesUrl).pipe(catchError(this.OnHttpError));
  }

  DeleteTemplate(id : number)
  {
    return this.http.delete(this._templatesUrl + "/" +id).pipe(catchError(this.OnHttpError));
  }

  GetTemplate(id : number)
  {
    return this.http.get<Template>(this._templatesUrl + "/" +id).pipe(catchError(this.OnHttpError));
  }

  SaveTemplate(t : Template)
  {
    return this.http.put<Template>(this._templatesUrl + "/" + t.id, t).pipe(catchError(this.OnHttpError));;
  }

  SaveNewTemplate(t: Template)
  {
    return this.http.post<Template>(this._templatesUrl, t).pipe(catchError(this.OnHttpError));;
  }

  OnHttpError(error : HttpErrorResponse)
  {
    return Observable.throw(error.message);
  }
}
