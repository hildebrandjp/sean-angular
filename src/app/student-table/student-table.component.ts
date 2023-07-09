import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../model/Student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent{

  @Input('students') students: Student[] = [];
  @Output() studentIdEvent = new EventEmitter<number | undefined>();
  constructor(
    private router: Router,
    private studentService: StudentService
    ) {}

  ngOnInit(): void {

  }

  navigateStudent(id: number | undefined) {
    this.router.navigate(['student', id]);
  }

  editStudent(id: number | undefined) {
    this.studentService.editIdStudentChanged.next(id);
    this.studentService.createModeChanged.next(false);
  }

  deleteStudent(id: number | undefined) {
    this.studentService.deleteStudentById(id).subscribe(
      (response) => {
        if (response) {
          // TODO: refresh student table
          this.studentService.createModeChanged.next(false);
          this.studentService.createModeChanged.next(true);
        }
      }
    );
  }

}
