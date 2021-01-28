import { UserService } from './../shared/services/user.service';
import { UserModel } from '../shared/models/user.model.abstract';
import { CreateModalComponent } from './../create-modal/create-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faUserEdit, faTrash, IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public editIcon: IconDefinition;
  public deleteIcon: IconDefinition;
  public addIcon: IconDefinition;
  
  resultsLength = 0;
  animal: string;
  name: string;

  constructor(
    private httpService: UserService, 
    private toastr: ToastrService, 
    public dialog: MatDialog ) 
  {
    this.editIcon = faUserEdit;
    this.deleteIcon = faTrash;
    this.addIcon = faPlus;
   }

  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.httpService.findByPage(1).subscribe(r => console.log(r.lastName));
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
}

const ELEMENT_DATA: UserModel[] = [
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'},
  {id: 1, firstName: "Test", lastName: 'Test2', email:'some@email.com'}
];


