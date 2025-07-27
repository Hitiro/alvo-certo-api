import { HistoryOfQueryService } from './../history-of-query/history-of-query.service';
import { CreateHistoryOfQueryDto } from './../history-of-query/dto/create-history-of-query.dto';
import { ExtractOfUserService } from './../extract-of-user/extract-of-user.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateFindCnpjDto } from './dto/create-find-cnpj.dto';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
// import { Resultado } from './dto/response-cnpj.dto';
import { TypeOfQueryService } from 'type-of-query/type-of-query.service';
import { ShowUserDto } from 'users/dto/show-user.dto';

@Injectable()
export class FindCnpjService {
  private readonly logger = new Logger(FindCnpjService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly typeOfQuery: TypeOfQueryService,
    private readonly extractOfUserService: ExtractOfUserService,
    private readonly historyOfQueryService: HistoryOfQueryService,
  ) {}

  async findData(
    createFindCnpjDto: CreateFindCnpjDto,
    user: ShowUserDto,
    ip: string,
  ) {
    const cnpj = createFindCnpjDto.cnpj;

    if (!cnpj || cnpj.length !== 14) return 'CNPJ Inválido';

    const cost: number =
      createFindCnpjDto.pesquisar.length < 10
        ? createFindCnpjDto.pesquisar.length
        : 10;

    const { prefixo_consulta: prefix } = await this.typeOfQuery.findOne(
      createFindCnpjDto.id_tipo_consulta,
    );

    const saldo = await this.extractOfUserService.getCurrentBalance(
      user.userId,
    );

    if (saldo < cost) {
      throw new HttpException(
        `Você não possui saldo suficiente para essa Busca. \n Saldo: ${saldo} \n Custo: ${cost}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await firstValueFrom(
      this.httpService
        .get(`https://consulta-cnpj-gratis.p.rapidapi.com/office/${cnpj}`, {
          params: {
            simples: 'true',
          },
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com',
          },
        })
        .pipe(
          map((result) => {
            // const resultData: Resultado = result.data;

            // const filteredResponse: Partial<Resultado> = {};
            // for (const field of selectedFields) {
            //   if (resultData[field]) {
            //     filteredResponse[field] = resultData[field];
            //   } else {
            //     filteredResponse[field] = '';
            //   }
            // }
            return result.data;
          }),
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
      success: true,
      resultado: result,
    };

    const history: CreateHistoryOfQueryDto = {
      id_tipo_consulta: createFindCnpjDto.id_tipo_consulta,
      codigo: prefix,
      conjunto_dados: createFindCnpjDto.pesquisar.toString(),
      custo: cost,
      consultado_por: user.userId,
      tipo_dado: createFindCnpjDto.tipo_dado,
      chave: createFindCnpjDto.cnpj,
      resultado: JSON.stringify(resultado),
    };

    const savedHistory = await this.historyOfQueryService.create(history, ip);

    return { resultado: resultado, savedHistory: savedHistory };
  }
}
