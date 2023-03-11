/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoursesDto } from './dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do Nest',
      description: 'Fundamentos do Nest',
      tags: ['nest', 'node', 'typescript'],
    },
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: string): Course {
    const course = this.courses.find((course) => course.id == Number(id));

    /*     if (!course) {
      throw new HttpException('Curso não encontrado!', HttpStatus.NOT_FOUND);
    } */

    if (!course) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Curso não encontrado!',
      });
    }

    return course;
  }

  create(CreateCoursesDto: CreateCoursesDto): Course {
    const lastCourse = this.courses[this.courses.length - 1];
    const id = lastCourse.id + 1;
    const course = { id, ...CreateCoursesDto };
    this.courses.push(course);
    return CreateCoursesDto;
  }

  someDataUpdate(id: string, UpdateCoursesDto): void {
    const idexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    this.courses[idexCourse] = UpdateCoursesDto;
    return UpdateCoursesDto;
  }

  delete(id: string) {
    const idexCourse = this.courses.findIndex(
      (course) => course.id == Number(id),
    );
    this.courses.splice(idexCourse, 1);
  }
}
