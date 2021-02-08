import { User } from './../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../shared/services/user.service';
import { jobs } from './../shared/models/jobs.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html'
})
export class CreateModalComponent implements OnInit {

  public userForm: FormGroup;
  public errorMessage: string;
  public jobs: Array<string>
  public user: User;
  public title: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPayload
  ) {
    this.errorMessage = 'This field is required, max 15 characters'
    this.jobs = new Array();
    this.setJobs();
    this.title = 'New user';
  }

  ngOnInit(): void {
    if(!this.data.newUser) {
      this.user = this.data.payload;
      this.title = 'Update';
    }
    this.buildForm();
  }

   buildForm(): void { 
     this.userForm = this.formBuilder.group({
       'firstName': [(this.data.newUser) ? null : this.user.first_name, [Validators.required, Validators.maxLength(15)]],
       'lastName': [(this.data.newUser) ? null: this.user.last_name, [Validators.required, Validators.maxLength(15)]],
       'email': [(this.data.newUser) ? null: this.user.email, [Validators.required, Validators.email]],
       'job': [null]
     });
  }

  getEmailError(): string {
    return (this.userForm.get('email').hasError('required')) ? 'This field is required' : 'Enter a valid email';
  }

  onSubmit(user: any): void {
    console.log(this.userForm.valid);
    if(this.data.newUser) {
      this.httpClient.create(user).subscribe(
        u => this.toastr.success('User created successful', ''), 
        e => this.toastr.error(e.message, '')
      );
    } else {
      this.httpClient.update(this.user.id, user).subscribe(
        u => this.toastr.success('User updated successful', ''),
        e => this.toastr.error(e.message, '')
      );
    }
    this.dialogRef.close();
  }

  onCancel(): void {
    this.toastr.info('Modal closed', '')
    this.dialogRef.close();
  }

  setJobs(): void {
     Object.keys(jobs).forEach(j => this.jobs.push(j));
  }
}

export interface DialogDataPayload {
  payload: User
  newUser: boolean
}