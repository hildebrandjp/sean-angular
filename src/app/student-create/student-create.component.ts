import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../model/Student.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {

  @Output() studentForm = new EventEmitter<Student>();
  studentIdOnEdit: number | undefined;
  students: Student = {
    name: '',
    email: '',
    contact_number: ''
  };
  isSuccessCreateStudent = false;
  isCreateMode = true;
  student: Student | undefined;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.createModeChanged.asObservable().subscribe(
      (createModeChange) => {
        this.isCreateMode = createModeChange;
      }
    );
    this.studentService.editIdStudentChanged.asObservable().subscribe(
      (editIdChange) => {
        this.studentIdOnEdit = editIdChange;
        this.applyEditInformation(editIdChange);
      }
    )
  }

  applyEditInformation(id: number | undefined) {
    if (id) {
      this.studentService.getStudentById(id).subscribe(
        (toEditStudentInformation) => {
          this.students.name = toEditStudentInformation.name;
          this.students.email = toEditStudentInformation.email;
          this.students.contact_number = toEditStudentInformation.contact_number;
        }
      )
    }
  }

  studentSubmitForm(studentData: NgForm) {
    const studentForm: Student = {
      name: studentData.value.name,
      email: studentData.value.email,
      contact_number: studentData.value.contactNumber,
    }
    if (this.isCreateMode) {
      this.studentForm.emit(studentForm);
    } else {
      this.studentService.updateStudentById(this.studentIdOnEdit, studentForm).subscribe(
        (response) => {
          if (response) {
            this.studentService.createModeChanged.next(true);
          }
        }
      );

    }
    studentData.resetForm();
  }

  
}
