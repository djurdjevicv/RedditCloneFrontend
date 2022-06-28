import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOneRulesComponent } from './card-one-rules.component';

describe('CardOneRulesComponent', () => {
  let component: CardOneRulesComponent;
  let fixture: ComponentFixture<CardOneRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOneRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOneRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
