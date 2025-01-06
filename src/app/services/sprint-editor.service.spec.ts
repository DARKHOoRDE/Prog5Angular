import { TestBed } from '@angular/core/testing';

import { SprintEditorService } from './sprint-editor.service';

describe('SprintEditorService', () => {
  let service: SprintEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
