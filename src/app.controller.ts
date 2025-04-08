import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService, HelloObject } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redirect')
  @Redirect('https://google.com')
  getRouteDirect(): string {
    return this.appService.getHello();
  }

  @Get('/error')
  getExpectionError(): string {
    // throw new HttpException(
    //   "Forbidden, you don't have access for this feature route",
    //   HttpStatus.FORBIDDEN,
    // );
    // throw new HttpException(
    //   {
    //     customMessage: 'This is custom message object',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    try {
      throw new Error('Something went wrong!');
    } catch (error) {
      Logger.error(`🔥🔥🔥 Something went wrong: ${error}`);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  @HttpCode(200)
  postHello(@Body() body: Body, @Query() qur: any, @Req() req: Request): any {
    console.log(body, ' -*-*-*-', req.user);
    return this.appService.postHello();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get('/asas')
  // findAll(@Res() res: Response) {
  //   res.status(HttpStatus.OK).json([]);
  // }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
