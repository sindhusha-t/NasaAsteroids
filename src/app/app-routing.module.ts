import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AsteroidsTableComponent} from './asteroids-table/asteroids-table.component';
import {AsteroidsGraphComponent} from './asteroids-graph/asteroids-graph.component';
import {Asteroids3DComponent} from './asteroids3-d/asteroids3-d.component';

const routes: Routes = [
  {
    path: 'asteroids',
    component: AsteroidsTableComponent
  },
  {
    path: 'asteroids/graph',
    component: AsteroidsGraphComponent
  },
  {
    path: '',
    redirectTo: '/asteroids',
    pathMatch: 'full'
  },
  {
    path: 'asteroids/space',
    component: Asteroids3DComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
