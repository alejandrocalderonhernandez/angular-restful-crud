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

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.errorMessage = 'This field is required, max 15 characters'
    this.jobs = new Array();
    this.setJobs();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      'firstName': [null, Validators.required, Validators.maxLength(15)],
      'lastName': [null, Validators.required, Validators.maxLength(15)],
      'email': [null, [Validators.required, Validators.email]],
      'job': [null]
    });
  }

  getEmailError(): string {
    return (this.userForm.get('email').hasError('required')) ? 'This field is required' : 'Enter a valid email';
  }

  onSubmit(user: any): void {
    console.log(user);
    this.httpClient.create(user).subscribe(u => this.toastr.success('User created successful', ''));
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setJobs(): void {
     Object.keys(jobs).forEach(j => this.jobs.push(j));
  }
}


export interface DialogData {
  animal: string;
  name: string;
}