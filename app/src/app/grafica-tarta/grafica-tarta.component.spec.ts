import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTartaComponent } from './grafica-tarta.component';

describe('GraficaTartaComponent', () => {
  let component: GraficaTartaComponent;
  let fixture: ComponentFixture<GraficaTartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaTartaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaTartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
