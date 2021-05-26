import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsersComponent } from './users.component';

const routerMock = {
  navigate: () =>  null
};

const toastrMock = {
  error: () => null
};

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UsersComponent 
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: toastrMock},
        {provide: MatDialog, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('findById should navigate to user page when the id is valid', () => {
    const routerSpy = spyOn(routerMock, 'navigate');
    const userId = { 
      target: {
        value: 1
      }
    };
    component.findById(userId);
    expect(routerSpy).toHaveBeenCalled();
    
  }); 

  it('findById should show a toastr error when the id is undefined', () => {
    const toastrSpy = spyOn(toastrMock, 'error');
    const userId = undefined;
    component.findById(userId);
    expect(toastrSpy).toHaveBeenCalled();
  }); 

  it('findById should show a toastr error when the id is invalid', () => {
    const toastrSpy = spyOn(toastrMock, 'error');
    const userId = { 
      target: {
        value: 'invalid'
      }
    };
    component.findById(userId);
    expect(toastrSpy).toHaveBeenCalled();
  }); 

});
