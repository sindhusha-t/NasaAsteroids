import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {animation} from '@angular/animations';
import {Asteroid} from './asteroid';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {

  results: any;
  objectsDiv: HTMLElement;
  arrayObjects: any;
  centerX: number;
  centerY: number;
  elementCount = {};
  url: string;
  public values: any;

  constructor(private http: HttpClient) {
  }

  setPlanPoints(centerX, centerY) {
    this.centerX = centerX / 2;
    this.centerY = centerY / 2;
  }

  getCurrentDate() {

    const today = new Date();
    const dd = today.getDate();
    const mm = (today.getMonth() + 1); // January is 0!
    const yyyy = today.getFullYear();
    let mmS = '' + mm;
    let ddS = '' + dd;
    if (dd < 10) {
      ddS = '0' + dd;
    }
    if (mm < 10) {
      mmS = '0' + mm;
    }
    return mmS + '-' + ddS + '-' + yyyy;
  }

  getNextWeek() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const dd = nextWeek.getDate();
    const mm = nextWeek.getMonth() + 1; // January is 0!
    const yyyy = nextWeek.getFullYear();
    let mmS = '' + mm;
    let ddS = '' + dd;

    if (dd < 10) {
      ddS = '0' + dd;
    }
    if (mm < 10) {
      mmS = '0' + mm;
    }

    return mmS + '-' + ddS + '-' + yyyy;
  }

  getUrl(startDate, endDate) {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);
    const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + start + '&end_date=' + end;
    return url + '&api_key=' + 'KOWjS9o7xb6ffafjNh1YtXHvmU5YVRO7br17JPtB'; // use your private key !
  }



  getBrowseUrl() {
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=KOWjS9o7xb6ffafjNh1YtXHvmU5YVRO7br17JPtB';
    return url;
  }

  getElementCount() {
    const url = this.getUrl(this.getCurrentDate(), this.getNextWeek());
    const i = 1;
    const year = '' + this.getYear(this.getCurrentDate());

    this.doStuff(url, i);
  }

  doStuff(url, i) {

    if ( i <100 ) {
      this.getResults(url).then(data => {

        this.values = data;

        const year = this.getYearFromUrl(url);

        if (! this.elementCount.hasOwnProperty(year)) {
          this.elementCount[year] = 0;
        }

        this.elementCount[year] += this.values.element_count;
        url = this.values.links.prev;

        i += 1;
        this.doStuff(url, i);


      });
    }
  }

  parseDate(date) {
    if (date.includes('-')) {
      const arr = date.split('-');
      return arr[2] + '-' + arr[0] + '-' + arr[1];
    } else if (date.includes('/')) {
      const arr = date.split('/');
      return arr[2] + '-' + arr[0] + '-' + arr[1];
    } else {
      return null;
    }
  }

  getYear(date) {
    const arr = date.split('-');
    return arr[0] + '-' + arr[1];
  }

  getYearFromUrl(url) {
    const arr1 = url.split('=');
    const arr2 = arr1[1].split('&');
    const arr3 = arr2[0].split('-');

    return arr3[0] + '-' + arr3[1];
  }

  getResults(url) {

    return this.http.get(url).toPromise()
      .then(res => this.results = res);
  }

  extractData() {

    const dates = this.results.near_earth_objects;
    let mapDates;
    mapDates = [];
    Object.keys(dates).forEach(key => {
      const value = dates[key];
      mapDates.push({date: key, arr: value});
    });

    const myFunc = (a, b) => {
      let c: any;
      let d: any;
      c = new Date(a.date);
      d = new Date(b.date);
      return c - d;
    };
    mapDates.sort((a, b) => myFunc(a, b));

    return this.printResult(mapDates);
  }

  getAsteroids() {
    return this.objectsDiv;
  }

  getTotalObjects() {
    return this.results.element_count;
  }

  getStats() {
    const arr = this.arrayObjects;
    const firstCondition = false;
    const secondCondition = false;

    let kmClosest = arr[0].kilometers;
    let kmFurthest = arr[0].kilometers;
    let mSmallest = arr[0].diameter;
    let mBiggest = arr[0].diameter;
    let kmPHourSlowest = arr[0].velocity;
    let kmPHourFastest = arr[0].velocity;

    let idClosest = arr[0].id;
    let idFurthest = arr[0].id;
    let idSmallest = arr[0].id;
    let idBiggest = arr[0].id;
    let idFastest = arr[0].id;
    let idSlowest = arr[0].id;

    for (const data of arr) {
      if (kmClosest > data.kilometers) {
        kmClosest = data.kilometers;
        idClosest = data.id;
      } else if (kmFurthest < data.kilometers) {
        kmFurthest = data.kilometers;
        idFurthest = data.id;
      } else if (mSmallest > data.diameter) {
        mSmallest = data.diameter;
        idSmallest = data.id;
      } else if (mBiggest < data.diameter) {
        mBiggest = data.diameter;
        idBiggest = data.id;
      } else if (kmPHourSlowest > data.velocity) {
        kmPHourSlowest = data.velocity;
        idSlowest = data.id;
      } else if (kmPHourFastest < data.velocity) {
        kmPHourFastest = data.velocity;
        idFastest = data.id;
      }
    }

    let stats = {};
    stats = {
      furthest: String(this.precisionRound(kmFurthest, 2)),
      closest: String(this.precisionRound(kmClosest, 2)),
      smallest: String(this.precisionRound(mSmallest, 2)),
      biggest: String(this.precisionRound(mBiggest, 2)),
      fastest: String(this.precisionRound(kmPHourFastest, 2)),
      slowest: String(this.precisionRound(kmPHourSlowest, 2))
    };

    return stats;
  }

  printResult(map) {
    let html = '';
    let index = 0;
    this.arrayObjects = [];
    this.objectsDiv = document.createElement('div');
    for ( const date of map) {
      html += '<ul>' + date;
      for (const result of date.arr ) {
        const name = result.name;
        const magnitude = result.absolute_magnitude_h;
        const kilometers = result.close_approach_data[0].miss_distance.kilometers;
        const velocity = result.close_approach_data[0].relative_velocity.kilometers_per_hour;
        const diameter = (result.estimated_diameter.meters.estimated_diameter_max
                        + result.estimated_diameter.meters.estimated_diameter_min ) / 2;
        const p = '<li>name: ' + name + ' ~ diameter: ' + diameter
          + 'm ~ distance: ' + kilometers + 'km ~ velocity: ' + velocity + 'km/h </li>';
        html += p;
        this.arrayObjects.push( { name,
                                  magnitude: parseFloat(magnitude),
                                  kilometers: parseFloat(kilometers),
                                  velocity: parseFloat(velocity),
                                  diameter: parseFloat(String(diameter)), id: index});
        const subDiv = this.drawAsteroids(parseFloat(kilometers), parseFloat(String(diameter)), name, index, parseFloat(velocity));
        this.objectsDiv.append(subDiv);
        index++;
      }
      html += '</ul> ';
    }
    return html;
  }

  drawAsteroids(distance, size, title, id, velocity) {

    let object;
    object = document.createElement('div');
    object.className = 'obj';
    object.title = title;
    object.style.width = size / 25 + 'px';
    object.style.height = size / 25 + 'px';
    object.velocity = velocity;
    object.distance = distance;

    const angle = this.getAngle();
    const distPixels = distance / 200000;

    let objectX = 0;
    let objectY = 0;

    if (this.generateSideLong() === 'left') {
      objectX = this.centerX - distPixels - (parseInt(object.style.width, 10) / 2) ;
      objectY = this.centerY - distPixels - (parseInt(object.style.height, 10) / 2);
    } else {
      objectX = this.centerX + distPixels - (parseInt(object.style.width, 10) / 2) ;
      objectY = this.centerY + distPixels - (parseInt(object.style.height, 10) / 2);
    }

    object.style.left = objectX + 'px';
    object.style.top = objectY + 'px';
    const subDiv = document.createElement('div');
    subDiv.id = id;
    subDiv.className = 'containObj';
    const speed = (10000 / object.velocity * 50) + 's';
    object.setAttribute('css', this.getAnimation(speed, this.generateSideLong()));
    subDiv.append(object);
    return subDiv;
  }

  setEarth() {
    let divCenter;
    divCenter = document.createElement('div');
    divCenter.className = 'center';
    divCenter.style.position = 'absolute';
    divCenter.style.left = this.centerX + 'px';
    divCenter.style.top = this.centerY + 'px';
    divCenter.title = 'Earth';
    return divCenter;
  }

  generateSideLong() {
    const random = Math.floor((Math.random() * 10) + 1);
    if (random > 5) {
      return 'left';
    } else {
      return 'right';
    }
  }
  generateSideLat() {
    const random = Math.floor((Math.random() * 10) + 1);
    if (random > 5) {
      return 'up';
    } else {
      return 'down';
    }
  }
  precisionRound(val, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(val * factor) / factor;
  }
  getAngle() {
    return Math.floor((Math.random() * 180) + 1);
  }

  getAnimation(speed, side) {
    return '-webkit-animation: spin-' + side + ' ' + Math.round(parseFloat(speed)) + 's linear infinite;' +
      '-moz-animation: spin-' + side + ' ' + Math.round(parseFloat(speed)) + 's linear infinite;' +
      '-ms-animation: spin-' + side + ' ' + Math.round(parseFloat(speed)) + 's linear infinite;' +
      '-o-animation: spin-' + side + ' ' + Math.round(parseFloat(speed)) + 's linear infinite;' +
      'animation: spin-' + side + ' ' + Math.round(parseFloat(speed)) + 's linear infinite;';
  }


  parse(json: any): Asteroid[] {
    let asteroids = new Array<Asteroid>();
    Object.values(json.near_earth_objects).forEach((date: Array<any>) => {
      asteroids = asteroids.concat(date.map(a => this.toAsteroid(a)));
    });
    return asteroids;
  }

  private toAsteroid(json: any): Asteroid {
    const asteroid = new Asteroid();
    asteroid.date = new Date(json.close_approach_data[0].close_approach_date);
    const diameterMax =
      json.estimated_diameter.kilometers.estimated_diameter_max;
    const diameterMin =
      json.estimated_diameter.kilometers.estimated_diameter_min;
    const diameterAvg = (diameterMax - diameterMin) / 2;
    asteroid.radius = (diameterMin + diameterAvg) / 2;
    asteroid.distance = parseFloat(
      json.close_approach_data[0].miss_distance.lunar
    );

    asteroid.hazardous = json.is_potentially_hazardous_asteroid ? 'Yes' : 'No';
    asteroid.name = json.name;
    asteroid.magnitude = parseFloat(json.absolute_magnitude_h);
    asteroid.velocity = parseFloat(
      json.close_approach_data[0].relative_velocity.kilometers_per_second
    );
    return asteroid;
  }

}

