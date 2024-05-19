import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFindCnpjDto, searchFields } from './dto/create-find-cnpj.dto';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Resultado, responseCnpj } from './dto/response-cnpj.dto';

@Injectable()
export class FindCnpjService {
  private readonly logger = new Logger(FindCnpjService.name);
  constructor(private readonly httpService: HttpService) {}

  async findData(createFindCnpjDto: CreateFindCnpjDto) {
    const cnpj = createFindCnpjDto.cpfcnpj;
    const selectedFields = createFindCnpjDto.pesquisar.map(
      (field) => searchFields[field],
    );

    if (!cnpj || cnpj.length !== 14) return 'CNPJ Inválido';
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
          map((result) => {
            const resultData: Resultado = result.data;

            const filteredResponse: Partial<Resultado> = {};
            for (const field of selectedFields) {
              if (resultData[field]) {
                filteredResponse[field] = resultData[field];
              } else {
                filteredResponse[field] = '';
              }
            }
            return filteredResponse;
          }),
          catchError(async (error: AxiosError) => {
            this.logger.error(error);
            throw new BadRequestException({
              Message: 'Erro ao atualizar buscar CNPJ',
              MessageError: error.message,
              Success: false,
            });
          }),
        ),
    );
    const resultado = {
      message: 'Consulta realizada com suceso',
      Success: true,
      resultado: result,
    };
    return resultado;
  }
}
