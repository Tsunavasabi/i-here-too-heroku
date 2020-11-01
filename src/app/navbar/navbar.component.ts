import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() list : boolean;
  faUser = faUser;
  user: any

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  Logout() {
    localStorage.removeItem('user')
    location.reload()
  }

}
