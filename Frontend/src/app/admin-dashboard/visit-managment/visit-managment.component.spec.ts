import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitManagmentComponent } from './visit-managment.component';

describe('VisitManagmentComponent', () => {
  let component: VisitManagmentComponent;
  let fixture: ComponentFixture<VisitManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
