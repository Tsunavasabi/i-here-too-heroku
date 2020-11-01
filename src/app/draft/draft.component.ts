import { Component, OnInit } from '@angular/core';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  faCaretSquareDown = faCaretSquareDown
  draft: any
  constructor(private router: Router, private http: HttpClient) { 
    if (JSON.parse(localStorage.getItem('logout')) == true) {
      router.navigateByUrl('/')
      localStorage.setItem('logout' , JSON.stringify(false))
    }
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user'))._id
    console.log(data)
    this.http.get<any>('https://iheretootest.herokuapp.com/api/blogs/myblogs/draft/memberid='+data)
    .subscribe(result => {
      console.log(result)
      var i
      for (i = 0; i < result.length; i++ ) {
        result[i].createdAt = moment(result[i].createdAt).format('DD MMM YYYY h:mm A')
      }
      this.draft = result
    })
  }

  gopublish() {
    this.router.navigateByUrl('/dashboard')
  }

  edit(dft) {
    this.router.navigateByUrl('/write', {state: dft})
  }

  delete(dft) {
    this.http.delete('https://iheretootest.herokuapp.com/api/blogs/delblog/blogid='+dft._id)
    .subscribe(() => {
      alert('Delete Successful')
    })
  }

}
