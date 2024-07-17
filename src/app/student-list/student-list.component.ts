import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../services/service1.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../register/register.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  constructor(private service:Service1Service){
    this.getAllStudentsList();
  }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  public getAllStudentsList():void
  {
    this.service.getStudentsList().subscribe(
      {
        next:(res:Student[])=>{
        console.log(res);
          
        },
       error :(err:HttpErrorResponse)=>{
        console.log("error is::  ",err);
       }

      }
    );
  }

}
