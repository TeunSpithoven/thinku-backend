import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  async addStudent(student: Student) {
    const findStudent = await this.getStudentById(student.userId);
    if (findStudent === 'Not Exists') {
      const newStudent = new Student(student);
      this.students.push(newStudent);
    }
  }

  async getStudentById(
    userId: Student['userId'],
  ): Promise<Student | 'Not Exists'> {
    const searchForStudentIndex = await this.getStudentIndexById(userId);
    if (searchForStudentIndex === -1) {
      return 'Not Exists';
    }
    return this.students[searchForStudentIndex];
  }

  async getStudentIndexById(userId: Student['userId']): Promise<number> {
    const searchForStudentIndex = this.students.findIndex(
      (Student) => Student.userId === userId,
    );
    return searchForStudentIndex;
  }

  async removeStudentById(userId: Student['userId']): Promise<void> {
    const findStudentIndex = await this.getStudentIndexById(userId);
    if (findStudentIndex == -1) {
      throw 'Student does not exist so cannot be removed from the store';
    }
    this.students.splice(findStudentIndex, 1);
  }
}
