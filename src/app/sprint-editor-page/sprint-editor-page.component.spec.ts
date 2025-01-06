import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintEditorPageComponent } from './sprint-editor-page.component';

describe('SprintEditorPageComponent', () => {
  let component: SprintEditorPageComponent;
  let fixture: ComponentFixture<SprintEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintEditorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
