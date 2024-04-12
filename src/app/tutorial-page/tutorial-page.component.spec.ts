import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialPageComponent } from './tutorial-page.component';

describe('TutorialPageComponent', () => {
  let component: TutorialPageComponent;
  let fixture: ComponentFixture<TutorialPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialPageComponent]
    });
    fixture = TestBed.createComponent(TutorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
