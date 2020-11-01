import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faPlusCircle, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {
  title: string
  detail: string
  all_tag: any
  faPlusCircle = faPlusCircle
  faImage = faImage
  editing: any

  constructor(private modalService: NgbModal, private router: Router, private http: HttpClient) {
      const navigation = this.router.getCurrentNavigation();
      this.editing = navigation.extras.state ? navigation.extras.state : 0;
      console.log(this.editing)
      if (this.editing != 0) {
          this.title = this.editing.title
          this.detail = this.editing.body
          this.reverse()
          this.all_tag = this.editing.tags
      }
   }

  ngOnInit(): void {
  }

  open() {
    let content = {
      title: this.title,
      body: this.detail,
      tags: this.all_tag
    }
    const modal = this.modalService.open(TagModalComponent, { windowClass: 'modal-holder', centered: true});
    modal.componentInstance.content = content;
    modal.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.all_tag = receivedEntry
      })
  }

  publish() {
    let writedata = {
      title: this.title,
      body: this.detail,
      author: JSON.parse(localStorage.getItem('user')).name,
      tags: this.all_tag,
      ispublished: true
    }
    console.log(writedata)
    if (writedata.tags == undefined) {
        alert("Please add tags")
    } else {
      this.http.post<any>('https://iheretootest.herokuapp.com/api/blogs/writenew', writedata).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/dashboard');
    })
    }
  }

  draft() {
    let writedata = {
      title: this.title,
      body: this.detail,
      author: JSON.parse(localStorage.getItem('user')).name,
      tags: this.all_tag,
      ispublished: false
    }
    console.log(writedata)
    if (writedata.tags == undefined) {
        alert("Please add tags")
    } else {
        this.http.post<any>('https://iheretootest.herokuapp.com/api/blogs/writenew', writedata).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/draft');
    })
  }
  }

  replace_pub() {
    this.detail = this.detail.replace(/\n/g, "</br></br>");
    this.publish()
  }

  replace_dft() {
    this.detail = this.detail.replace(/\n/g, "</br></br>");
    this.draft()
  }

  reverse() {
    let rev = this.detail.split('</br></br>').join('\n\n')
    this.detail = rev
  }

  update() {
    this.detail = this.detail.replace(/\n/g, "</br></br>");
    let writedata = {
      id: this.editing._id,
      title: this.title,
      body: this.detail,
      tags: this.all_tag,
    }
    console.log(writedata)
    if (writedata.tags == undefined) {
        alert("Please add tags")
    } else {
        this.http.put<any>('https://iheretootest.herokuapp.com/api/blogs/editblog', writedata).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/draft');
      })
    }
  }

}
