import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AocContainerComponent } from './aoc-container.component';

describe('AocContainerComponent', () => {
  let component: AocContainerComponent;
  let fixture: ComponentFixture<AocContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AocContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
