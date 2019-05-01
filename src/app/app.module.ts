import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { PopupComponent } from './popup/popup.component';
import { PlanComponent } from './plan/plan.component';
import {HttpClientModule} from '@angular/common/http';
import { SafeHTMLPipe } from './safe-html.pipe';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AsteroidsTableComponent } from './asteroids-table/asteroids-table.component';
import { AsteroidsGraphComponent } from './asteroids-graph/asteroids-graph.component';
import { Asteroids3DComponent } from './asteroids3-d/asteroids3-d.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlotsComponent } from './plots/plots.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PopupComponent,
    PlanComponent,
    SafeHTMLPipe,
    AsteroidsTableComponent,
    AsteroidsGraphComponent,
    Asteroids3DComponent,
    PlotsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
