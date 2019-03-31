import { Component, Input, OnInit } from '@angular/core';
import {AsteroidsService} from '../asteroids.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  @Input() objectsDiv: HTMLElement;
  constructor( private service: AsteroidsService) { }

  ngOnInit() {
  }

}
