import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService, HelloObject } from './app.service';
import { Request } from 'express';
import {
  CustomForbiddenException,
  CustomForbiddenExceptionFunction,
} from './Exception/forbidden.exception';
import { CustomValidationPipe } from './Pipe/validation.pipe';
import { AuthGuard } from './Guard/auth.guard';

@Controller()
@UseGuards(AuthGuard)
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
    // try {
    //   throw new Error('Something went wrong!');
    // } catch (error) {
    //   Logger.error(`🔥🔥🔥 Something went wrong: ${error}`);

    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'This is a custom message',
    //     },
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: error,
    //     },
    //   );
    // }
    // return CustomForbiddenExceptionFunction();
    throw new CustomForbiddenException();
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

  @Get('/pipes/:id')
  pipeHandler(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): string {
    console.log(id, typeof id);
    return `This action returns a ${id}`;
  }

  @Get('/pipes/uuid/:uuid')
  pipeUUIDHandler(
    @Param('uuid', new ParseUUIDPipe())
    uuid: string,
  ): string {
    console.log(uuid, typeof uuid);
    return `This action returns a ${uuid}`;
  }

  @Get('/pipes/custom/:id')
  pipeCustomHandler(
    @Param('id', CustomValidationPipe)
    id: string,
  ): string {
    console.log(id, typeof id);
    return `This action returns a ${id}`;
  }

  @Get('/guard')
  GuardHandler(): string {
    return `This action returns a`;
  }
}
