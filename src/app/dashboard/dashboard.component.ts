import { Component, OnInit } from '@angular/core';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faCaretSquareDown = faCaretSquareDown
  page : number = 1
  pageSize = 24
  collectionSize
  publish: any
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user'))._id
    console.log(data)
    this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/myblogs/published/memberid='+data)
    .subscribe(result => {
      console.log(result)
      var i
      for (i = 0; i < result.length; i++ ) {
        result[i].createdAt = moment(result[i].createdAt).format('DD MMM YYYY h:mm A')
      }
      this.publish = result
    })
  }

  godraft() {
    this.router.navigateByUrl('/draft')
  }

  delete(pub) {
    this.http.delete('https://iheretootest.herokuapp.com/api/blogs/delblog/blogid='+pub._id)
    .subscribe(() => {
      alert('Delete Successful')
    })
  }

  changedraft(pub) {
    let writedata = {
      id: pub._id,
      ispublished: false
    }
    console.log(writedata)
    this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/editblog', writedata).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/draft');
    })
  }

}
