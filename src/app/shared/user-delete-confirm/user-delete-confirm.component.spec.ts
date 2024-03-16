import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteConfirmComponent } from './user-delete-confirm.component';

describe('UserDeleteConfirmComponent', () => {
  let component: UserDeleteConfirmComponent;
  let fixture: ComponentFixture<UserDeleteConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDeleteConfirmComponent]
    });
    fixture = TestBed.createComponent(UserDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
