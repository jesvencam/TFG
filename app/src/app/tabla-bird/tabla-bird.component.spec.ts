import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBirdComponent } from './tabla-bird.component';

describe('TablaBirdComponent', () => {
  let component: TablaBirdComponent;
  let fixture: ComponentFixture<TablaBirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBirdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaBirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
