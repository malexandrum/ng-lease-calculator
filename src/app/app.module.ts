import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { Select2Module } from 'ng2-select2';

import { AppComponent } from './app.component';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    // Select2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
