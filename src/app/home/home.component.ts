import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createTrue } from 'typescript';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latests: any
  thailands: any
  news_for_you: any
  about1: string; about2: string
  about3: string; about4: string
  about5: string; news1: any
  news2 : any; news3: any
  news4 : any; news5: any
  user = null; have = false; list = true

  constructor(private http: HttpClient, private router: Router) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.have = true
      this.user = JSON.parse(localStorage.getItem('user')).name
    }
   }

  ngOnInit(): void {
    this.getLatest()
    this.getThailand()
    if (this.have == true) {
      this.getForyou()
      this.getTag()
    }
  }

  getTag() {
    let id = JSON.parse(localStorage.getItem('user'))._id
    this.http.get<any>('https://iheretootest.herokuapp.com/api/tags/mytoptags/memberid='+id)
    .subscribe(result => {
      let tags = result
      console.log(tags)
      if (tags[0] != undefined) {
        this.about1 = tags[0]
        console.log(this.about1)
        this.getAbout(this.about1, 1)
      } 
      if (tags[1] != undefined) {
        this.about2 = tags[1]
        console.log(this.about2)
        this.getAbout(this.about2, 2)
      } 
      if (tags[2] != undefined) {
        this.about3 = tags[2]
        console.log(this.about3)
        this.getAbout(this.about3, 3)
      } 
      if (tags[3] != undefined) {
        this.about4 = tags[3]
        console.log(this.about4)
        this.getAbout(this.about4, 4)
      } 
      if (tags[4] != undefined) {
        this.about5 = tags[4]
        console.log(this.about5)
        this.getAbout(this.about5, 5)
      }
    })
    
  }

  getAbout(tag, order) {
    this.http.get('https://iheretootest.herokuapp.com/api/blogs/news-about/tag='+tag).subscribe(result => {
      console.log(result)
      if (order == 1) {
        this.news1 = result
      } else if (order == 2) {
        this.news2 = result
      } else if (order == 3) {
        this.news3 = result
      } else if (order == 4) {
        this.news4 = result
      } else if (order == 5) {
        this.news5 = result
      } 
    })
  }

  getLatest() {
    this.http.get('https://iheretootest.herokuapp.com/api/blogs/latest-news').subscribe(result => {
      console.log(result)
      this.latests = result
    })
  }

  getThailand() {
    this.http.get('https://iheretootest.herokuapp.com/api/blogs/thailand-trends').subscribe(result => {
      console.log(result)
      this.thailands = result
    })
  }

  getForyou() {
    let member = JSON.parse(localStorage.getItem('user'))._id
    this.http.get('https://iheretootest.herokuapp.com/api/blogs/news-for-you/memberid='+member).subscribe(result => {
      console.log(result)
      this.news_for_you = result
    })
  }

  read(data) {
    this.router.navigateByUrl('/read', data)
  }

}
