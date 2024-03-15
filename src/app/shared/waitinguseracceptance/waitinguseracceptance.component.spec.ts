import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitinguseracceptanceComponent } from './waitinguseracceptance.component';

describe('WaitinguseracceptanceComponent', () => {
  let component: WaitinguseracceptanceComponent;
  let fixture: ComponentFixture<WaitinguseracceptanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitinguseracceptanceComponent]
    });
    fixture = TestBed.createComponent(WaitinguseracceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
