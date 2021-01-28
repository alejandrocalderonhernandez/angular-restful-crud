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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.errorMessage = 'This field is required, max 15 characters'
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}


export interface DialogData {
  animal: string;
  name: string;
}