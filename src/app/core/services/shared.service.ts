import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedUserIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  selectedUserId$: Observable<string | null> = this.selectedUserIdSubject.asObservable()
  constructor() { }

  setSelectedUserId(userId: string) {
    this.selectedUserIdSubject.next(userId)
  }
}
