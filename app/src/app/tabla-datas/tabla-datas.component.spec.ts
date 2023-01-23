import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDatasComponent } from './tabla-datas.component';

describe('TablaDatasComponent', () => {
  let component: TablaDatasComponent;
  let fixture: ComponentFixture<TablaDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
