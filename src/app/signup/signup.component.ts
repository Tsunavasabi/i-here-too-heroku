import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagModalComponent } from '../tag-modal/tag-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string
  password: string
  email: string
  conpassword: string

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  signup(tags) {
  
    let payload = {email: this.email, 
      password: this.password,
      name: this.username,
      tags: tags
      }
    this.http.post<any>('https://iheretootest.herokuapp.com/api/members/register', payload).subscribe(result => {
          this.router.navigateByUrl('/home');
    }, err => {
          console.log(err)
    })
  }

  open(content) {
    const modal = this.modalService.open(TagModalComponent, { windowClass: 'modal-holder', centered: true});
    modal.componentInstance.content = content;
    modal.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      var i
      let tags = new Array()
      for (i=0; i<receivedEntry.length; i++) {
        let tag_list = {
        tag: receivedEntry[i],
        views: 0
      }
      tags.push(tag_list)
      }
      this.signup(tags)
    })
  }

  checkpassword() {
      let payload = {email: this.email, 
      password: this.password,
      name: this.username,
      signup: true 
      }
      if (this.conpassword != this.password) {
        alert("Please fill correct password!")
      } else {
        this.open(payload)
      }
  }

}