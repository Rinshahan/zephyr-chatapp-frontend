import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent implements OnInit {
  users: User[]
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res
    }, (err) => {
      console.log(err.error.message);
    })
  }
}
