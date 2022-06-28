import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarModeratorComponent } from './navigation-bar-moderator.component';

describe('NavigationBarModeratorComponent', () => {
  let component: NavigationBarModeratorComponent;
  let fixture: ComponentFixture<NavigationBarModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
