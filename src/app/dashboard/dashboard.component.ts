import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../model/Student.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studentsFromDashboard: Student[] = [];

  constructor(
    private studentService: StudentService
    ) {}

    ngOnInit(): void {
      this.runGetAllStudent();
      this.studentService.createModeChanged.asObservable().subscribe(
        (createModeChange) => {
            if (createModeChange) {
              this.runGetAllStudent();
            }
        }
      )
    }

    runGetAllStudent() {
      this.studentService.getAllStudent().subscribe((studentsResponse) => {
        this.studentsFromDashboard = [...studentsResponse];
      });
    }

    studentSubmitForm(studentData: Student) {
      this.studentService.createStudent(studentData).subscribe(
        (response) => {
          if (response) {
            this.ngOnInit();
          }
        }
      );
    }
}
