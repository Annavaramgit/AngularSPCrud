import { Component, OnInit } from '@angular/core';
import { Student } from './register.interface';
import { NgForm } from '@angular/forms';
import { Service1Service } from '../services/service1.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Student interface
  student: Student = {
    studentHallTicket: 0,
    stuentName: '',
    collegeName: '',
    state: '',
    gender: '',
    skills: []
  }

  skill: string[] = [];

  constructor(private service:Service1Service) {}

  ngOnInit(): void {
    
  }
  /* whatever gender user selects this methods calls and set to the gender field in the Student */
  slectGender(gender: string): void {
    this.student.gender = gender;
    console.log("gender sleceted:  "+this.student.gender)
  }

  /* 
  the below is for skills check boxes,
  what ever user cheked that added in the skill array(declared above),
  first if condtion checks the check box is checked or not(if checked then that is true ,otherwise false),
  if the contion true then the values of event pushed into skill array,
  if the false(uncheked) then it iterated(forEcah used) if skill value equals uncheked value then it removes(splice)
*/
  selectskill(event: any): void {

    if (event.checked) {
      this.skill.push(event.source.value);
    }
    else {
      this.skill.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skill.splice(index, 1);
          }
        }
      )
    }
    this.student.skills = this.skill;
    console.log("skills selected: "+this.student.skills)
  }

  /* after form submisio this method will call,
    this method calls service class method(savestudent()),
    sends what ever data user enter to backend api
  */
  savestudent(regForm:NgForm):void
  {
    this.service.saveStudentService(this.student).subscribe(
      {
        //call back for success response
        next:(response :Student)=>{
          console.log(response);
          regForm.reset();
          this.student.gender='';
          this.student.skills=[];

        },
        //call back for error response
        error:(err:HttpErrorResponse)=>{
          console.log(err)
        }
      }
    )

  }
  /*  the below is for after user fills registration form saved successfully in db
      the fills values should reset (like empty /fresh form)
      for that name,hallnum,clg,state are work fine but skill and gender not so we can use this method did that reset    
  */
  checkSkill(skillCheck:string){
    return this.student.skills!=null && this.student.skills.includes(skillCheck);
  }
  checkGender(gender:string){
    return this.student.gender!=null && this.student.gender.includes(gender);

  }

}
