import { User } from './../shared/models/user.model';
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
  public users:Array<User>;
  public dataSource: MatTableDataSource<UserModel>;

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
    this.users = new Array();
   }

  ngOnInit(): void {
    this.httpService.findByPage(1).subscribe(r => {
      r.data.forEach(u => this.users.push(u));
      if(this.users.length > 0) {
        this.toastr.success('Load data success!', '');
        this.dataSource = new MatTableDataSource(this.users);
      } else {
        this.toastr.error('Error in service', '');
      }
    });
  }

  displayedColumns: Array<string> = ['id', 'firstName', 'lastName', 'email', 'actions'];
  

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



