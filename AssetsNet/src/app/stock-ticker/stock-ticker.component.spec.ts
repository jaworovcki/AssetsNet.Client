import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTickerComponent } from './stock-ticker.component';

describe('StockTickerComponent', () => {
  let component: StockTickerComponent;
  let fixture: ComponentFixture<StockTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
