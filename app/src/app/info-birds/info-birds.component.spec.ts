import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBirdsComponent } from './info-birds.component';

describe('InfoBirdsComponent', () => {
  let component: InfoBirdsComponent;
  let fixture: ComponentFixture<InfoBirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBirdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
