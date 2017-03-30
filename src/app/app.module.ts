import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { PrinterDetailComponent } from "./printer-detail.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],
  declarations: [ AppComponent, PrinterDetailComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
