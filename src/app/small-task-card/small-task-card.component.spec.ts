import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTaskCardComponent } from './small-task-card.component';

describe('SmallTaskCardComponent', () => {
  let component: SmallTaskCardComponent;
  let fixture: ComponentFixture<SmallTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallTaskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
