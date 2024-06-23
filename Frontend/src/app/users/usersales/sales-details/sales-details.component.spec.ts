import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUserDetailsComponent } from './sales-details.component';

describe('SalesDetailsComponent', () => {
  let component: SalesUserDetailsComponent;
  let fixture: ComponentFixture<SalesUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesUserDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
