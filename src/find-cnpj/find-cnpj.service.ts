import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFindCnpjDto } from './dto/create-find-cnpj.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class FindCnpjService {
  private readonly logger = new Logger(FindCnpjService.name);
  constructor(private readonly httpService: HttpService) {}

  async findData(createFindCnpjDto: CreateFindCnpjDto) {
    const cnpj = createFindCnpjDto.cpfcnpj;
    // const result = await firstValueFrom(
    //   this.httpService
    //     .get(`https://consulta-cnpj-gratis.p.rapidapi.com/office/${cnpj}`, {
    //       params: {
    //         simples: 'true',
    //       },
    //       headers: {
    //         'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    //         'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com',
    //       },
    //     })
    //     .pipe(
    //       catchError(async (error: AxiosError) => {
    //         this.logger.error(error);
    //         throw new BadRequestException({
    //           message: 'Erro ao atualizar buscar CNPJ',
    //           MessageError: error.message,
    //         });
    //       }),
    //     ),
    // );
    const result = await firstValueFrom(
      this.httpService
        .get(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`)
        .pipe(
          catchError(async (error: AxiosError) => {
            this.logger.error(error);
            throw new BadRequestException({
              message: 'Erro ao atualizar buscar CNPJ',
              MessageError: error.message,
            });
          }),
        ),
    );
    const resultado = {
      message: 'Consulta realizada com suceso',
      resultado: result.data,
    };
    return resultado;
  }
}
