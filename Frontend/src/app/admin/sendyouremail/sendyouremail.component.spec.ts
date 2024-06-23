import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendyouremailComponent } from './sendyouremail.component';

describe('SendyouremailComponent', () => {
  let component: SendyouremailComponent;
  let fixture: ComponentFixture<SendyouremailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendyouremailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendyouremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
