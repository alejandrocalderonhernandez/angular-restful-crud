import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from './../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styles: [
  ]
})
export class DeleteModalComponent implements OnInit {

  constructor(private httpClient: UserService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<DeleteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeleteDialogPayload) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onDelete(): void {
    this.httpClient.delete(this.data.id).subscribe(
      () => this.toastr.info('User deleted', ''), 
      e => this.toastr.error(e.message, '')
    )
    this.dialogRef.close();
  }
}

export interface DeleteDialogPayload {
  id: number;
}
