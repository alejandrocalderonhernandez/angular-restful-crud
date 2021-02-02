import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { UserModel } from '../shared/models/user.model.abstract';
import { CreateModalComponent } from './../create-modal/create-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faUserEdit, faTrash, IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

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

  public onPageChange(page: PageEvent): void {
    this.findByPage(page.pageIndex + 1);
  }
  
  applyFilter(event: Event): void {

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



