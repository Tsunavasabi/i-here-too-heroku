import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.username)
    console.log(this.password)
    let payload = {email: this.username, password: this.password}
    this.http.post<any>('https://iheretootest.herokuapp.com/member/login', payload).subscribe(result => {
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result))
      if (result)
        this.router.navigateByUrl('/')
    })
  }

}
