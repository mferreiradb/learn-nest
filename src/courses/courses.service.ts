import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  create({ name, description, tags }: Course): void {
    const lastCourse = this.courses[this.courses.length - 1];
    const id = lastCourse.id + 1;
    this.courses.push({ id, name, description, tags });
  }

  someDataUpdate(id: string, { name, description }: Course): Course {
    const course = this.courses.find((course) => course.id == Number(id));
    course.name = name;
    course.description = description;
    return course;
  }

  delete(id: string) {
    const idexCourse = this.courses.findIndex(
      (course) => course.id == Number(id),
    );
    this.courses.splice(idexCourse, 1);
  }
}
