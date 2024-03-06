import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingcallmodalComponent } from './incomingcallmodal.component';

describe('IncomingcallmodalComponent', () => {
  let component: IncomingcallmodalComponent;
  let fixture: ComponentFixture<IncomingcallmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingcallmodalComponent]
    });
    fixture = TestBed.createComponent(IncomingcallmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
