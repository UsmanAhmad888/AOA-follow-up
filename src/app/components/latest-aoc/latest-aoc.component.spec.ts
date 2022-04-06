import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestAocComponent } from './latest-aoc.component';

describe('LatestAocComponent', () => {
  let component: LatestAocComponent;
  let fixture: ComponentFixture<LatestAocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestAocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestAocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
