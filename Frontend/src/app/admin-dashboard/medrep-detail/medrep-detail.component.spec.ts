import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedrepDetailComponent } from './medrep-detail.component';

describe('MedrepDetailComponent', () => {
  let component: MedrepDetailComponent;
  let fixture: ComponentFixture<MedrepDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedrepDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedrepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
