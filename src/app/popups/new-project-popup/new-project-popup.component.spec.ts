import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectPopupComponent } from './new-project-popup.component';

describe('NewProjectPopupComponent', () => {
  let component: NewProjectPopupComponent;
  let fixture: ComponentFixture<NewProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProjectPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
