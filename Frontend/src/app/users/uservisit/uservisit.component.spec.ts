import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservisitComponent } from './uservisit.component';

describe('UservisitComponent', () => {
  let component: UservisitComponent;
  let fixture: ComponentFixture<UservisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UservisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UservisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
