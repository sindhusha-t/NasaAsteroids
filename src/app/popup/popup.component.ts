import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AsteroidsService} from '../asteroids.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  total: number;
  startDate: string;
  endDate: string;
  url: string;
  htmlToAdd: string;
  objectsDiv: HTMLElement;
  stats: any;

  showLoader: boolean;
  showHome: boolean;

  constructor(private service: AsteroidsService) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.showHome = false;
    this.startDate = this.service.getCurrentDate();
    this.endDate = this.service.getNextWeek();
    this.doStuff();
  }

  doStuff() {
    this.url = this.service.getUrl(this.startDate, this.endDate);
    this.service.getResults(this.url).then(() => {
      this.total = this.service.getTotalObjects();
      this.htmlToAdd = this.service.extractData();
      this.objectsDiv = this.service.getAsteroids();
      this.objectsDiv.append(this.service.setEarth());
      this.stats = this.service.getStats();
      console.log(this.stats);
      this.showLoader = false;
      this.showHome = true;
    });
  }

  buttonClick() {
    this.doStuff();
  }

}



