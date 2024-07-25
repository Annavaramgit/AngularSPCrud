import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../register/register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor(private http: HttpClient) {
  }
  url = "http://localhost:8091"

  /* for save */
  public saveStudentService(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.url}/save`, student);
  }
  
  /* for get all students in db */
  public getStudentsList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/getAll`);
  }

  /* delete the student record*/
  public deleteStudent(studentId:number){
    return this.http.delete(`${this.url}/delete/${studentId}`);
  }
  /*get student specifically */ 
  public getSpecificStudent(studentId:number):Observable<Student>{
    return this.http.get<Student>(`${this.url}/getSpecific/${studentId}`)
  }

}
