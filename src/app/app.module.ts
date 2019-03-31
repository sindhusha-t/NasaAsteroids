import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { PopupComponent } from './popup/popup.component';
import { PlanComponent } from './plan/plan.component';
import {HttpClientModule} from '@angular/common/http';
import { SafeHTMLPipe } from './safe-html.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PopupComponent,
    PlanComponent,
    SafeHTMLPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
