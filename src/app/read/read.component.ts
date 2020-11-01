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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getNews()
    this.Addview()
    console.log(window.history.state)
  }

  getNews() {
    let id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/read/blogid='+id)
    .subscribe(result => {
      console.log(result)
      this.title = result.title
      this.detail = result.body
      this.tags = result.tags
      this.name = result.author
      this.id = result._id
      this.updatedAt = moment(result.updatedAt).format('DD MMM YYYY')
    })
  }

  Addview() {
    if (JSON.parse(localStorage.getItem('user')) != undefined) {
      console.log('login')
          let view = {
            blogid: this.id, memberid: JSON.parse(localStorage.getItem('user'))._id
          }

          this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/addviews', view)
          .subscribe(() => {
            console.log('add view!')
          })
    } else {
      console.log('not login')
      let view = {
        blogid: this.id
      }
      this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/addviews', view)
      .subscribe(() => {
        console.log('add view!')
      })
    }
  }

}
