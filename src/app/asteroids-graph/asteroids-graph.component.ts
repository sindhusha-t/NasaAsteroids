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
  asteroids: Asteroid[];
  colours: ScaleOrdinal<string, {}>;
  width = 640;
  height = 480;
  scaleLinearX: ScaleLinear<number, number>;
  scaleLinearY: ScaleLinear<number, number>;

  constructor(private asteroidsService: AsteroidsService, private d3: D3Service,
              private element: ElementRef, private timeoutService: TimeoutService) {}

  ngAfterViewInit() {
    const url = this.asteroidsService.getUrl(this.asteroidsService.getCurrentDate(), this.asteroidsService.getNextWeek());
    forkJoin([
      this.resize(),
      this.asteroidsService.getResults(url).then((data) => {
      const values = this.asteroidsService.parse(data);
      this.displayChart(values);
    })
    ]);
  }

  get colourDomain(): string[] {
    return this.colours && this.colours.domain();
  }

  private category(asteroid): string {
    if (asteroid.hazardous === 'Yes') {
      return 'Potentially Hazardous';
    } else {
      return 'Non-hazardous';
    }
  }

  private displayChart(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX.domain(this.d3.extent(asteroids, (d) => d.velocity)).nice();
    this.scaleLinearY.domain(this.d3.extent(asteroids, (d) => d.distance)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX);
    const yAxis = this.d3.axisLeft(this.scaleLinearY);
    const svg = this.d3.select(this.element.nativeElement).select('svg g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private resize(): Observable<{}> {
    return this.timeoutService.timeout(() => {
      const svg = this.d3.select(this.element.nativeElement).select('svg').node() as HTMLElement;
      this.width = svg.getBoundingClientRect().width - 120;
      this.height = svg.getBoundingClientRect().height - 120;
    });
  }
}
