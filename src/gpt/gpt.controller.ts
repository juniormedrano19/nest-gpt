import { Controller, Post,Body, Res, HttpStatus } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';


@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check') 
  orthographyCheck(
    @Body() orthographyDto:OrthographyDto //todo lo que manden en el body reflejalo

  ){
  //  return orthographyDto
   return this.gptService.orthographyCheck(orthographyDto)
  }


  @Post('pros-cons-discusser') 
  prosConsDicusser(
    @Body() ProsConsDiscusserDto:ProsConsDiscusserDto //todo lo que manden en el body reflejalo

  ){
  //  return orthographyDto
   return this.gptService.prosConsDicusser(ProsConsDiscusserDto)
  }
  



  @Post('pros-cons-discusser-stream') 
 async prosConsDicusserStream(
    @Body() ProsConsDiscusserDto:ProsConsDiscusserDto, //todo lo que manden en el body reflejalo
    @Res() res:Response,
  ){
  //  return orthographyDto
   const stream= await this.gptService.prosConsDicusserStream(ProsConsDiscusserDto)
   //emitir la respuesta basado en ese objeto response
   res.setHeader('Content-Type','application/json');
   res.status(HttpStatus.OK); //creado por nestjs 200

   //solo como es stream de varias emisiones
   //chunk es pedazo de respuesta
   for await(const chunk of stream){
      const piece=chunk.choices[0].delta.content || ''
      // console.log(piece);
      res.write(piece)
   }

   res.end()

  }
}
