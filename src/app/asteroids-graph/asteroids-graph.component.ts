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
  width = 300;
  height = 200;
  scaleLinearX1: ScaleLinear<number, number>;
  scaleLinearY1: ScaleLinear<number, number>;
  scaleLinearX2: ScaleLinear<number, number>;
  scaleLinearY2: ScaleLinear<number, number>;
  scaleLinearX3: ScaleLinear<number, number>;
  scaleLinearY3: ScaleLinear<number, number>;
  scaleLinearX4: ScaleLinear<number, number>;
  scaleLinearY4: ScaleLinear<number, number>;
  scaleLinearX5: ScaleLinear<number, number>;
  scaleLinearY5: ScaleLinear<number, number>;
  scaleLinearX6: ScaleLinear<number, number>;
  scaleLinearY6: ScaleLinear<number, number>;

  startDate: string;
  endDate: string;

  constructor(private asteroidsService: AsteroidsService, private d3: D3Service,
              private element: ElementRef, private timeoutService: TimeoutService) {}

  ngAfterViewInit() {
    this.startDate = this.asteroidsService.getCurrentDate();
    this.endDate = this.asteroidsService.getNextWeek();
    const url = this.asteroidsService.getUrl(this.asteroidsService.getCurrentDate(), this.asteroidsService.getNextWeek());
    forkJoin([
      this.resize(),
      this.asteroidsService.getResults(url).then((data) => {
        const values = this.asteroidsService.parse(data);
        this.displayChart1(values);
        this.displayChart2(values);
        this.displayChart3(values);
        this.displayChart4(values);
        this.displayChart5(values);
        this.displayChart6(values);
      })
    ]);
  }

  buttonClick() {
    const url = this.asteroidsService.getUrl(this.startDate, this.endDate);
    forkJoin([
      this.resize(),
      this.asteroidsService.getResults(url).then((data) => {
        const values = this.asteroidsService.parse(data);
        this.displayChart1(values);
        this.displayChart2(values);
        this.displayChart3(values);
        this.displayChart4(values);
        this.displayChart5(values);
        this.displayChart6(values);
      })
    ]);
  }

  colourDomain(): string[] {
    return this.colours && this.colours.domain();
  }

  private category(asteroid): string {
    if (asteroid.hazardous === 'Yes') {
      return 'Potentially Hazardous';
    } else {
      return 'Non-hazardous';
    }
  }

  private displayChart1(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX1 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY1 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX1.domain(this.d3.extent(asteroids, (d) => d.velocity)).nice();
    this.scaleLinearY1.domain(this.d3.extent(asteroids, (d) => d.distance)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX1);
    const yAxis = this.d3.axisLeft(this.scaleLinearY1);
    const svg = this.d3.select(this.element.nativeElement).select('#chart1 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private displayChart2(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX2 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY2 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX2.domain(this.d3.extent(asteroids, (d) => d.velocity)).nice();
    this.scaleLinearY2.domain(this.d3.extent(asteroids, (d) => d.radius)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX2);
    const yAxis = this.d3.axisLeft(this.scaleLinearY2);
    const svg = this.d3.select(this.element.nativeElement).select('#chart2 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private displayChart3(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX3 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY3 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX3.domain(this.d3.extent(asteroids, (d) => d.distance)).nice();
    this.scaleLinearY3.domain(this.d3.extent(asteroids, (d) => d.radius)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX3);
    const yAxis = this.d3.axisLeft(this.scaleLinearY3);
    const svg = this.d3.select(this.element.nativeElement).select('#chart3 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private displayChart4(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX4 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY4 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX4.domain(this.d3.extent(asteroids, (d) => d.distance)).nice();
    this.scaleLinearY4.domain(this.d3.extent(asteroids, (d) => d.magnitude)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX4);
    const yAxis = this.d3.axisLeft(this.scaleLinearY4);
    const svg = this.d3.select(this.element.nativeElement).select('#chart4 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private displayChart5(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX5 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY5 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX5.domain(this.d3.extent(asteroids, (d) => d.radius)).nice();
    this.scaleLinearY5.domain(this.d3.extent(asteroids, (d) => d.magnitude)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX5);
    const yAxis = this.d3.axisLeft(this.scaleLinearY5);
    const svg = this.d3.select(this.element.nativeElement).select('#chart5 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private displayChart6(asteroids) {
    this.asteroids = asteroids;
    this.scaleLinearX6 = this.d3.scaleLinear().range([0, this.width]);
    this.scaleLinearY6 = this.d3.scaleLinear().range([this.height, 0]);
    this.scaleLinearX6.domain(this.d3.extent(asteroids, (d) => d.velocity)).nice();
    this.scaleLinearY6.domain(this.d3.extent(asteroids, (d) => d.magnitude)).nice();
    this.colours = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.asteroids.forEach((a) => this.colours(this.category(a)));
    const xAxis = this.d3.axisBottom(this.scaleLinearX6);
    const yAxis = this.d3.axisLeft(this.scaleLinearY6);
    const svg = this.d3.select(this.element.nativeElement).select('#chart6 g');
    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);
  }

  private resize(): Observable<{}> {
    return this.timeoutService.timeout(() => {
      const svg = this.d3.select(this.element.nativeElement).select('#chart1').node() as HTMLElement;
      this.width = svg.getBoundingClientRect().width - 120;
      this.height = svg.getBoundingClientRect().height - 120;

      const svg2 = this.d3.select(this.element.nativeElement).select('#chart2').node() as HTMLElement;
      this.width = svg2.getBoundingClientRect().width - 120;
      this.height = svg2.getBoundingClientRect().height - 120;

      const svg3 = this.d3.select(this.element.nativeElement).select('#chart3').node() as HTMLElement;
      this.width = svg3.getBoundingClientRect().width - 120;
      this.height = svg3.getBoundingClientRect().height - 120;

      const svg4 = this.d3.select(this.element.nativeElement).select('#chart4').node() as HTMLElement;
      this.width = svg4.getBoundingClientRect().width - 120;
      this.height = svg4.getBoundingClientRect().height - 120;

      const svg5 = this.d3.select(this.element.nativeElement).select('#chart5').node() as HTMLElement;
      this.width = svg5.getBoundingClientRect().width - 120;
      this.height = svg5.getBoundingClientRect().height - 120;

      const svg6 = this.d3.select(this.element.nativeElement).select('#chart6').node() as HTMLElement;
      this.width = svg6.getBoundingClientRect().width - 120;
      this.height = svg6.getBoundingClientRect().height - 120;

    });
  }
}
