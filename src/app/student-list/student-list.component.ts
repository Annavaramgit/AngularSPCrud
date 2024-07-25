import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../services/service1.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../register/register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  //table column headers
  displayedColumns: string[] = ['id', 'studentHallTicket', 'stuentName', 'collegeName', 'state', 'skills', 'gender', 'edit', 'delete'];
  //data get from api
  dataSource: Student[] = [];

  constructor(private service: Service1Service, private router: Router) {
    this.getAllStudentsList();
  }

  ngOnInit(): void {

  }
  /*calling service for get all students list*/
  public getAllStudentsList(): void {
    this.service.getStudentsList().subscribe(
      {
        next: (res: Student[]) => {
          this.dataSource = res;
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log("error is::  ", err);
        }

      }
    );
  }
  /* for deleting the student record*/
  public deleteStudent(id: number): void {
    console.log("deleting id is:" + id);
    this.service.deleteStudent(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllStudentsList(); //this is for after delete automatically remove that record instead of refersh
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    });
  }
  /* edit the student data*/
  public editStudent(id: number): void {
    this.router.navigate(["/register",{studentId:id}]);
  }

}
