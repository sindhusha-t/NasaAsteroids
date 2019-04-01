import { Injectable } from '@angular/core';
import * as d3 from 'd3/index';
import { Numeric, ScaleOrdinal, ScaleLinear, Axis } from 'd3/index';
import { Selection } from 'd3-selection';

@Injectable()
export class D3Service {
  get event(): any {
    return d3.event;
  }

  get schemeCategory10(): string[] {
    return d3.schemeCategory10;
  }

  axisBottom(scale): Axis<{}> {
    return d3.axisBottom(scale);
  }

  axisLeft(scale): Axis<{}> {
    return d3.axisLeft(scale);
  }

  extent<T, U extends Numeric>(array, accessor): [U, U] {
    return d3.extent<T, U>(array, accessor);
  }

  scaleLinear(): ScaleLinear<number, number> {
    return d3.scaleLinear();
  }

  scaleOrdinal<Domain, Range>(range?: Range[]): ScaleOrdinal<Domain, Range> {
    return d3.scaleOrdinal<Domain, Range>(range);
  }

  select(element): Selection<any, {}, null, undefined> {
    return d3.select(element);
  }
}
