import { Component, OnInit } from '@angular/core';
import { Student } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 
  //Student interface
  student:Student={
    studentHallTicket: 0,
    stuentName: '',
    collegeName: '',
    state: '',
    gender: '',
    skills: []
  }

  constructor() { }


  ngOnInit(): void {
    
  }

}
