import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students: Student[];
  public editStudent: Student;
  public deleteStudent: Student;

  constructor(private studentService: StudentService){}

  ngOnInit() {
    this.getStudents();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe({
      next:(res: Student[]) => {
        this.students = res;
      },
      error:(err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }


  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form')?.click();
    this.studentService.addStudent(addForm.value).subscribe({
      next:(res: Student) => {
        console.log(res);
        this.getStudents();
        addForm.reset();
      },
      error:(err: HttpErrorResponse) => {
        alert(err.message);
        addForm.reset();
      }
    });
  }

  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudent(student).subscribe({
      next:(res: Student) => {
        console.log(res);
        this.getStudents();
      },
      error:(err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  public onDeleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe({
      next:(res: void) => {
        console.log(res);
        this.getStudents();
      },
      error:(err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

public searchStudents(key: string): void {
  console.log(key);
  const results: Student[] = [];
  for(const student of this.students) {
      if (student.studentCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(student);
    }
    this.students = results;
    if (!key) {
      this.getStudents();
    }
  }
}

public onGoBack(): void {
  this.getStudents();
}

  public onOpenModal(student: Student, mode: string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'edit') {
      this.editStudent = student!;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent = student!;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container?.appendChild(button);
    button.click();     
  }
}


