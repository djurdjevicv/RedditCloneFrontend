import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCommunityRulesComponent } from './dialog-add-community-rules.component';

describe('DialogAddCommunityRulesComponent', () => {
  let component: DialogAddCommunityRulesComponent;
  let fixture: ComponentFixture<DialogAddCommunityRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCommunityRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCommunityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
