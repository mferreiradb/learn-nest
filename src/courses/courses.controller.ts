/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCoursesDto } from './dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly CoursesService: CoursesService) {}

  @Get()
  listAllCourses(@Res() res): Course[] {
    return res.json(this.CoursesService.findAll());
  }

  @Get(':idCourse')
  findOne(@Param() params): Course {
    const { idCourse } = params;
    const course = this.CoursesService.findOne(idCourse);
    return course;
  }

  @Post()
  @HttpCode(201)
  createCourse(@Body() body: CreateCoursesDto, @Res() res) {
    const { name, description, tags } = body;
    const course = this.CoursesService.create({ name, description, tags });
    return res.json(course);
  }

  @Patch(':idCourse')
  updateSomeDataCourses(
    @Body() body: UpdateCoursesDto,
    @Param() params,
    @Res() res,
  ) {
    const { name, description } = body;
    const { idCourse } = params;
    const course = this.CoursesService.someDataUpdate(idCourse, {
      name,
      description,
    });
    return res.json(course);
  }

  @Delete(':idCourse')
  deleteCourse(@Param() params, @Res() res) {
    const { idCourse } = params;
    this.CoursesService.delete(idCourse);
    return res.json();
  }
}
