import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockUserCardComponent } from './unblock-user-card.component';

describe('UnblockUserCardComponent', () => {
  let component: UnblockUserCardComponent;
  let fixture: ComponentFixture<UnblockUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnblockUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnblockUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
