import { Component } from '@angular/core';
import { Student } from '../model/Student.model';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent {

    student: Student = {
      id: 0,
      name: '',
      contact_number: '',
      email: '',
    };

    constructor(
      private studentService: StudentService,
      private route: ActivatedRoute,
      private router: Router
      ) {

    }

    ngOnInit(): void {
      this.route.params.subscribe(
        (param) => {
          const id = param['studentId'];
          this.studentService.getStudentById(id).subscribe(
            (student: Student) => {
              this.student = student;
            }
          )
        }
      )
    }

    back() {
      this.router.navigate(['dashboard']);
    }
    
}
