import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {AsteroidsService} from '../asteroids.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-asteroids-table',
  templateUrl: './asteroids-table.component.html',
  styleUrls: ['./asteroids-table.component.css']
})
export class AsteroidsTableComponent implements AfterContentInit {

  asteroids: MatTableDataSource<{}>;
  columns = ['name', 'date', 'hazardous', 'distance', 'radius', 'velocity', 'magnitude'];
  @ViewChild(MatSort) sort: MatSort;

  startDate: string;
  endDate: string;

  constructor(private asteroidsService: AsteroidsService) {}

  ngAfterContentInit() {
    this.startDate = this.asteroidsService.getCurrentDate();
    this.endDate = this.asteroidsService.getNextWeek();
    const url = this.asteroidsService.getUrl(this.asteroidsService.getCurrentDate(), this.asteroidsService.getNextWeek());


    this.asteroidsService.getResults(url).then((data) => {
      const values = this.asteroidsService.parse(data);
      this.initDataSource(values);
    });
  }


  buttonClick() {
    const url = this.asteroidsService.getUrl(this.startDate, this.endDate);

    this.asteroidsService.getResults(url).then( (data) => {
      const values = this.asteroidsService.parse(data);
      this.initDataSource(values);
    }); this.asteroidsService.getResults(this.asteroidsService.getBrowseUrl()).then( (data) => {
      console.log(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.asteroids.filter = filterValue;
  }

  private initDataSource(data) {
    this.asteroids = new MatTableDataSource(data);
    this.asteroids.sort = this.sort;
  }
}
