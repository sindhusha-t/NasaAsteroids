import {D3Service} from './d3.service';
import {TimeoutService} from './timeout.service';
import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {AsteroidsService} from '../asteroids.service';
import {Asteroid} from '../asteroid';
import {forkJoin, Observable} from 'rxjs';
import { ScaleOrdinal, ScaleLinear } from 'd3';

@Component({
  providers: [D3Service, TimeoutService],
  selector: 'app-asteroids-graph',
  templateUrl: './asteroids-graph.component.html',
  styleUrls: ['./asteroids-graph.component.css']
})

export class AsteroidsGraphComponent implements AfterViewInit {

  constructor(private asteroidsService: AsteroidsService, private d3: D3Service,
              private element: ElementRef, private timeoutService: TimeoutService) {}

  ngAfterViewInit() {
  }
}
