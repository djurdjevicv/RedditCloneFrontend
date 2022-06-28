import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCommunityComponent } from './dialog-add-community.component';

describe('DialogAddCommunityComponent', () => {
  let component: DialogAddCommunityComponent;
  let fixture: ComponentFixture<DialogAddCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
