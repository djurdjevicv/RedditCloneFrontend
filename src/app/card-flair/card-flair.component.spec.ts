import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlairComponent } from './card-flair.component';

describe('CardFlairComponent', () => {
  let component: CardFlairComponent;
  let fixture: ComponentFixture<CardFlairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFlairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
