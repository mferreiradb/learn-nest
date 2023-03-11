/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateCoursesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  @IsArray()
  readonly tags: string[];
}
