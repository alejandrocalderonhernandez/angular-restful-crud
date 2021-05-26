import { DeleteModalComponent } from './../delete-modal/delete-modal.component';
import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { UserModel } from '../shared/models/user.model.abstract';
import { CreateModalComponent } from './../create-modal/create-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faUserEdit, faTrash, IconDefinition, faPlus, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public editIcon: IconDefinition;
  public deleteIcon: IconDefinition;
  public addIcon: IconDefinition;
  public pageSize: number;
  public totalRecords: number;
  public pageIndex: number;
  public users:Array<User>;
  public dataSource: MatTableDataSource<UserModel>;
  public displayedColumns: Array<string>;

  constructor(
    private httpService: UserService, 
    private router: Router,
    private toastr: ToastrService, 
    public dialog: MatDialog) 
  {
    this.editIcon = faUserEdit;
    this.deleteIcon = faTrash;
    this.addIcon = faPlus;
    this.users = new Array();
    this.displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];
   }

  ngOnInit(): void {
    const firstPage = 1;
    this.findByPage(firstPage);
  }

  findByPage(page: number): void {
    if(this.users.length > 0) {
      this.users = [];
    }
    this.httpService.findByPage(page).subscribe(r => {
      r.data.forEach(u => this.users.push(u));
      if(this.totalRecords === undefined) {
        this.totalRecords = r.total;
        this.pageSize = r.per_page;
        this.pageIndex = r.page-1;
      }
      if(this.users.length > 0) {
        this.toastr.success('Load data success!', '');
        this.dataSource = new MatTableDataSource(this.users);
      } else {
        this.toastr.error('Error in service', '');
      }
    });
  }

  onPageChange(page: PageEvent): void {
    this.findByPage(page.pageIndex + 1);
  }
  
  findById(value: any): void {
    if(value === undefined || value === null) {
      this.toastr.error('The id cant be undefined')
      return;
    }
    let id = parseInt(value.target.value);
    if(!isNaN(id)) {
      this.router.navigate(['/user', id]);
    } else {
      this.toastr.error('The id should be type number')
    }
  }

  createOpenDialog(): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data: {user: null, newUser: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editOpenDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data: {payload: user, newUser: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  deleteOpenDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '230px',
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



