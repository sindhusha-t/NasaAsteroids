import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidsTableComponent } from './asteroids-table.component';

describe('AsteroidsTableComponent', () => {
  let component: AsteroidsTableComponent;
  let fixture: ComponentFixture<AsteroidsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsteroidsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsteroidsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
