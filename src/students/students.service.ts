import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

const students: Student[] = [];

@Injectable()
export class StudentsService {
  create(createStudentDto: CreateStudentDto) {
    const newStudent = new Student();
    newStudent.id = students.length + 1;
    newStudent.username = createStudentDto.username;
    newStudent.score = createStudentDto.score;
    students.push(newStudent);
    return newStudent;
  }

  findAll() {
    return students;
  }

  findOne(id: number) {
    return students.find((student) => student.id === id);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    const index = students.findIndex((student) => student.id === id);
    students[index].username = updateStudentDto.username;
    students[index].score = updateStudentDto.score;
    return this.findOne(id);
  }

  remove(id: number) {
    const index = students.findIndex((student) => student.id === id);
    students.splice(index, 1);
    return `student removed with id: ${id}`;
  }

  removeAll(gameId: number) {
    let count = 0;
    students.forEach((student) => {
      if (student.gameId === gameId) {
        const index = students.findIndex((student) => student === student);
        students.splice(index, 1);
        count++;
      }
    });
    return `${count} students removed from game: ${gameId}`;
  }
}
