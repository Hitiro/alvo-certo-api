import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindCpfDto } from './dto/create-find-cpf.dto';
import { AxiosError } from 'axios';
import { firstValueFrom, map, catchError } from 'rxjs';

@Injectable()
export class FindCpfService {
  private readonly logger = new Logger(FindCpfService.name);
  constructor(private readonly httpService: HttpService) {}

  async findCpf(data: FindCpfDto) {
    const url = process.env.BASE_URL;
    const result = await firstValueFrom(
      this.httpService
        .post(
          `${url}/antifraud/pf`,
          {
            cpf: data.cpf,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer',
            },
          },
        )
        .pipe(
          map((resp) => {
            return resp.data;
          }),
          catchError(async (error: AxiosError) => {
            this.logger.error(error);
            throw new BadRequestException({
              MessageError: error.message,
            });
          }),
        ),
    );
    return result;
  }
}
