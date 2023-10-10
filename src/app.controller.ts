import {Controller, Get, Param, Post, Body, UseInterceptors, UsePipes, UseFilters, HttpException} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from "./app.logging.interceptor";
import { id } from 'inversify';
import { AppAgeValidationPipe } from './app.age.validation.pipe';
import { RegisterDto } from './dto/register.dto';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { registerSchema } from './validation/schemas/register.schema';
import { HttpExceptionFilter } from './http.exception.filter';

// @UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const ret = this.appService.getHello(' 555')
    return ret;
  }

  // Pipe - Задание 2
  @Get('age/:age')
  getAgeInfo(@Param('age', AppAgeValidationPipe) age: string): string {
    return age;
  }

  // Joi - Задание 3
  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('/register')
  register(@Body() body: RegisterDto) {
    return body;
  }

  // Exeption filters - Задание 4
  @UseFilters( new HttpExceptionFilter())
  @Get('/error')
  testError() {
    throw new HttpException ('Oops', 401);
    // return 'errorrrr \n'
  }
}
