import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Service1Service } from "./services/service1.service";
import { inject } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Student } from "./register/register.interface";
/* Resolver is kind of service used for load the data before render*/
/* here after i select edit which data(record) that one filled in the regitstration form it self*/
export const ResolverClass: ResolveFn<Observable<Student>> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, studentService: Service1Service = inject(Service1Service)): Observable<Student> => {
    const studentId = route.paramMap.get("studentId");
    /* this if checking is id there are not it calls backend api,if present return id related data,else return else block(empty
    )*/
    if (studentId) {
      return studentService.getSpecificStudent(Number(studentId)).pipe(
        map((res: any) => res.Result as Student)
      );
    } else {
      // Return a default Student object
      const student: Student = {
        id: 0,
        studentHallTicket: 0,
        stuentName: '',
        collegeName: '',
        state: '',
        gender: '',
        skills: []
      };
      return of(student);
    }
  }