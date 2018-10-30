import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Template } from '../models/Template';
import * as JSZip from 'jszip';
import * as Docxtemplater from 'docxtemplater';
import JSZipUtils from 'jszip-utils'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { isArray } from 'util';

@Component({
  selector: 'app-auto-fill',
  templateUrl: './auto-fill.component.html',
  styleUrls: ['./auto-fill.component.scss']
})
export class AutoFillComponent implements OnInit {

  public templates: Template[] = [];
  public selectedTemplate: Template;
  public errorMsg: string = "";
  public SearchFor: number = 1;
  public wordFile: any;
  public excelFile: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetTemplatesList().subscribe(data => {
      this.templates = data;
      this.selectedTemplate = this.templates[0]?this.templates[0]:null
    }
    , error => this.errorMsg = error);
  }

  
  autofill2() {
    this.errorMsg = null;
    if (this.selectedTemplate == undefined) {
      this.errorMsg = "You have to select a Template";
      return;
    }
    if (this.excelFile == undefined) {
      this.errorMsg = "You have to select an xlsx file !";
      return;
    }
    if (this.wordFile == undefined) {
      this.errorMsg = "You have to select a docx file !";
      return;
    }
    let data: any = null;
    let ctx = this;

    const target: DataTransfer = <DataTransfer>(this.excelFile);
    //if (target.files.length !== 1) throw new Error('Cannot use multiple files'); //useless
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      let bstr: string;
      let wb: XLSX.WorkBook;

      let wsname: string;
      let ws: XLSX.WorkSheet;
      try {
        /* read workbook */
        bstr = e.target.result;
        let wb = XLSX.read(bstr, { type: 'binary' });
        /* grab first sheet */
        wsname = wb.SheetNames[0];
        ws = wb.Sheets[wsname];
      }
      catch (e) {
        ctx.errorMsg = "xlsx file could not be parsed !";
        return;
      }
      finally {
        data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        if (data == undefined || data == null
          || JSON.stringify(data).toLowerCase() === JSON.stringify({}).toLowerCase()) {
          ctx.errorMsg = "No data retreived from the xlsx file !";
          return;
        }
        else if (!isArray(data)) {
          ctx.errorMsg = "An error occured while reading the xlsx file !";
          return;
        }
        else {
          let obj: any = {};

          obj = ctx.GetObjectFromArray(data, ctx);

          if(JSON.stringify(obj).toLowerCase() !== JSON.stringify({}).toLowerCase())
          ctx.renderDocx(obj, ctx);
        }
      }
    }
    try {
      reader.readAsBinaryString(this.excelFile);
    }
    catch{
      this.errorMsg = "xlsx file could not be read !";
      return;
    }
  }
  private GetObjectFromArray(data: Array<Array<any>>, ctx: AutoFillComponent): any {
    let line: number = -1;

    for (let i = 0; i < data.length; i++) {
      if (data[i][ctx.selectedTemplate.SearchColumn - 1] == ctx.SearchFor) {
        line = i;
        break;
      }
    }
    if (line < 0) {
      ctx.errorMsg = "The element you searched for could not be found !";
      return {};
    }
    else {
      let obj: any = {};

      for (let pair of ctx.selectedTemplate.keyColumnPairs) {
        obj[pair.key] = data[line][pair.column - 1];
      }
      return obj;
    }


  }
  private renderDocx(obj: any, ctx: AutoFillComponent) {

    if (ctx.wordFile == undefined) {
      throw { message: "Docx file undedined" };
    }

    let docxUrl = URL.createObjectURL(ctx.wordFile);

    ctx.loadFile(docxUrl, function (error, content) {

      if (error) { throw error };
      let zip = new JSZip(content);
      let doc = new Docxtemplater().loadZip(zip)
      doc.setData(obj);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
        /* save data */
        let out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }) 
        //Output the document
        FileSaver.saveAs(out, ctx.SearchFor+".docx");
      }
      catch (error) {
        ctx.errorMsg = "An error ocurred when rendering the docx file"
        throw error;
      }
    });
  }
  private loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }
}
