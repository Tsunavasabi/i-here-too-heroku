import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.css']
})
export class TagModalComponent implements OnInit {
  @Input() content;
  hide : boolean = false
  closeResult = '';
  tag: string = ''
  all_tag = []
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.content)
    if (this.content.tags != undefined) {
      this.all_tag = this.content.tags
    }
  }

  addtag() {
    this.all_tag.push(this.tag)
  }

  save() {
    this.passEntry.emit(this.all_tag);
    this.activeModal.dismiss()
  }

}
