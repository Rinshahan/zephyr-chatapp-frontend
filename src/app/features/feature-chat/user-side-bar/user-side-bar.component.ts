import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent implements OnInit {
  users: User[]
  currentUserId
  constructor(private userService: UserService, private sharedService: SharedService, private userAuth: UserAuthService, private router: Router) { }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId')
    this.userService.getAllUsers().subscribe((res: UserResponse) => {
      console.log(res);
      this.users = res.data.getUsers
    }, (err) => {
      console.log(err.error.message);
    })
  }

  selectedUser(userId: string) {
    this.sharedService.setSelectedUserId(userId)
  }

  logout() {
    this.sharedService.setSelectedUserId(null)
    this.userAuth.userLogout()
    this.router.navigate(['/login'])
  }

}
