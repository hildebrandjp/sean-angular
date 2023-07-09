import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from '../model/Student.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    BASE_URL = 'http://localhost:3000'
    STUDENT_ENDPOINT = this.BASE_URL + '/students';

    public createModeChanged = new Subject<boolean>();
    public editIdStudentChanged = new Subject<number | undefined>();

    constructor(private http: HttpClient) {
    }

    getAllStudent(): Observable<Student[]> {
        return this.http.get<Student[]>(this.STUDENT_ENDPOINT);
    }

    getStudentById(id: number): Observable<Student> {
        return this.http.get<Student>(this.STUDENT_ENDPOINT + '/' + id);
    }

    updateStudentById( id: number | undefined, studentData: Student ) {
        return this.http.put(this.STUDENT_ENDPOINT + '/' + id, studentData);
    }

    deleteStudentById(id: number | undefined) {
        return this.http.delete(this.STUDENT_ENDPOINT + '/' + id);
    }

    createStudent(studentData: Student) {
        return this.http.post(this.STUDENT_ENDPOINT, {
            name: studentData.name,
            email: studentData.email,
            contact_number: studentData.contact_number
        })
    }
}