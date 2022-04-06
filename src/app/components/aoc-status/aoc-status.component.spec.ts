import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AocStatusComponent } from './aoc-status.component';

describe('AocStatusComponent', () => {
  let component: AocStatusComponent;
  let fixture: ComponentFixture<AocStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AocStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AocStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
