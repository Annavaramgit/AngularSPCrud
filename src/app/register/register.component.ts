import { Component, OnInit } from '@angular/core';
import { Student } from './register.interface';
import { NgForm } from '@angular/forms';
import { Service1Service } from '../services/service1.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /*property */
  student: Student = {
    id: 0,
    studentHallTicket: 0,
    stuentName: '',
    collegeName: '',
    state: '',
    gender: '',
    skills: []
  };

  /*property */
  skill: string[] = [];

  constructor(private service: Service1Service, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /* for eidit student data it calls ResolverClass*/ 
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.student = data.studentResolver as Student;
        this.skill=this.student.skills;
        console.log("---------", this.student);
      },
      error: (error: any) => {
        console.error('Error fetching student data', error);
      }
    });
  }
  /* whatever gender user selects this methods calls and set to the gender field in the Student */
  slectGender(gender: string): void {
    this.student.gender = gender;
    console.log("gender sleceted:  " + this.student.gender)
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
      console.log("source value  "+event.source.value);
      console.log("skills:::"+this.skill);
      
      
      this.skill.push(event.source.value);
      console.log("skill if ");
      
    }
    else {
      console.log("skill else");
      
      this.skill.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skill.splice(index, 1);
          }
        }
      )
    }
    //assining skill array in the student skill
    this.student.skills = this.skill;
    console.log("skills selected: " + this.student.skills)
  }

  /* after form submission this method will call,
    this method calls service class method(savestudent()),
    sends what ever data user enter to backend api
  */
  savestudent(regForm: NgForm): void {
    console.log("save student ");
    
    this.service.saveStudentService(this.student).subscribe(
      {
        //call back for success response
        next: (response: Student) => {
          console.log(response);
          regForm.reset();
          this.student.gender = '';
          this.student.skills = [];
          //this.router.navigate(["/studentList"]); //after click submit navigate automatically this component

        },
        //call back for error response
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      }
    )

  }

  /*for after click clear this method calls and clears the data in the form*/
  clearForm(regForm: NgForm): void {

    // regForm.reset();
    console.log("clearing=====");


    this.student = {
      id: 0,
      studentHallTicket: 0,
      stuentName: '',
      collegeName: '',
      state: '',
      gender: '',
      skills: []
    };
    // Clear the skill array
    this.skill = [];
  }

  


  /*  the below is for after user fills registration form saved successfully in db
      the filled values should reset (like empty /fresh form)
      for that name,hallnum,clg,state are work fine but skill and gender not so we can use this method did that reset    
  */
  checkSkill(skillCheck: string) {
    return this.student.skills != null && this.student.skills.includes(skillCheck);
  }
  checkGender(gender: string) {
    return this.student.gender != null && this.student.gender.includes(gender);

  }




}
