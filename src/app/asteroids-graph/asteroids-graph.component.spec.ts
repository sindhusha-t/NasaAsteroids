import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidsGraphComponent } from './asteroids-graph.component';

describe('AsteroidsGraphComponent', () => {
  let component: AsteroidsGraphComponent;
  let fixture: ComponentFixture<AsteroidsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsteroidsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsteroidsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
