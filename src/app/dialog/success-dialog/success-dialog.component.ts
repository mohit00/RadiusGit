import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {
  title: string;
 
  public onCancel(): void {
    this._bsModalRef.hide();
}
// tslint:disable-next-line: variable-name
  constructor(private _bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
