import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintHandlerPageComponent } from './sprint-handler-page.component';

describe('SprintHandlerPageComponent', () => {
  let component: SprintHandlerPageComponent;
  let fixture: ComponentFixture<SprintHandlerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintHandlerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintHandlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
