import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSalesComponent } from './list-all-sales.component';

describe('ListAllSalesComponent', () => {
  let component: ListAllSalesComponent;
  let fixture: ComponentFixture<ListAllSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
