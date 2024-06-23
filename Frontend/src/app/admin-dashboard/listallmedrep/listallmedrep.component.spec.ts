import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallmedrepComponent } from './listallmedrep.component';

describe('ListallmedrepComponent', () => {
  let component: ListallmedrepComponent;
  let fixture: ComponentFixture<ListallmedrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListallmedrepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListallmedrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
