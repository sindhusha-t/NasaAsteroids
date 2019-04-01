import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asteroids3DComponent } from './asteroids3-d.component';

describe('Asteroids3DComponent', () => {
  let component: Asteroids3DComponent;
  let fixture: ComponentFixture<Asteroids3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asteroids3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asteroids3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
