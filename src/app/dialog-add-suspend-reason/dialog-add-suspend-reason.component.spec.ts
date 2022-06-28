import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSuspendReasonComponent } from './dialog-add-suspend-reason.component';

describe('DialogAddSuspendReasonComponent', () => {
  let component: DialogAddSuspendReasonComponent;
  let fixture: ComponentFixture<DialogAddSuspendReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSuspendReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSuspendReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
