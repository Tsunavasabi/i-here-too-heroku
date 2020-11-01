import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  title: string
  detail: string
  tags: any
  name: string
  updatedAt: any
  id : any
  list = true

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getNews()
  }

  getNews() {
    let id = this.router.snapshot.paramMap.get('id');
    if (id == 'trending_1') {
      this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/read/trending_1')
      .subscribe(result => {
        this.title = result[0].title
        this.detail = result[0].body
        this.tags = result[0].tags
        this.name = result[0].author
        this.id = result[0]._id
        this.updatedAt = moment(result.updatedAt).format('DD MMM YYYY')
        this.Addview()
      })
    } else {
      this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/read/blogid='+id)
      .subscribe(result => {
        console.log(result)
        this.title = result.title
        this.detail = result.body
        this.tags = result.tags
        this.name = result.author
        this.id = result._id
        this.updatedAt = moment(result.updatedAt).format('DD MMM YYYY')
        this.Addview()
      })
    }
  }

  Addview() {
    if (JSON.parse(localStorage.getItem('user')) != undefined) {
          let view = {
            blogid: this.id,
            memberid: JSON.parse(localStorage.getItem('user'))._id
          }
          console.log(view)
          this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/addviews', view)
          .subscribe(() => {
            console.log('add view!') 
          }) 
    } else {
      let view = {
        blogid: this.id
      }
      console.log(view)
      this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/addviews', view)
      .subscribe(() => {
        console.log('add view!')
      })
    }
  }

}
