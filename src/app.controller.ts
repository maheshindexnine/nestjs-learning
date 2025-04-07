import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService, HelloObject } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Redirect('https://google.com')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(200)
  postHello(@Body() body: Body, @Query() qur: any): any {
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
