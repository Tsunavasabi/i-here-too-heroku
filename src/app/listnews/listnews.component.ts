import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {
  topic: string
  news = null
  popular : any
  list = true
  constructor(private http: HttpClient, private router: ActivatedRoute,
    private route: Router) { 
    if (JSON.parse(localStorage.getItem('logout')) == true) {
      route.navigateByUrl('/')
      localStorage.setItem('logout' , JSON.stringify(false))
    }
    this.getTag()
  }

  ngOnInit(): void {
    this.getTag()
    this.getPopular()
    this.list = false
  }

  getTag() {
    let id = this.router.snapshot.paramMap.get('id');
    this.topic = id
    if (this.topic == 'latest') {
      this.http.get('https://iheretootest.herokuapp.com/api/blogs/latest-news').subscribe(result => {
        console.log(result)
        this.news = result
      })
    } else {
      this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/news-about/tag='+id)
      .subscribe(result => {
        if (result.length != 0) {
          this.news = result
        }
        console.log(result)
      })
    }
  }

  getPopular() {
    this.http.get<any>('https://iheretootest.herokuapp.com/api/tags/popular')
    .subscribe(result => {
      console.log(result)
      this.popular = result
    })
  }

}
