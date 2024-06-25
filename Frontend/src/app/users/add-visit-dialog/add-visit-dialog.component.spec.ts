import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitDialogComponent } from './add-visit-dialog.component';

describe('VisitDialogComponent', () => {
  let component: AddVisitDialogComponent;
  let fixture: ComponentFixture<AddVisitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVisitDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
