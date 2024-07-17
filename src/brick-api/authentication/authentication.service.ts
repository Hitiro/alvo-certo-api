import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError, map } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(private readonly httpService: HttpService) {}

  async connect() {
    const authorization = `Basic ${btoa(process.env.BRICK_API_USER + ':' + process.env.BRICK_API_PWD)}`;

    await firstValueFrom(
      this.httpService
        .post(
          'https://api.brickseguros.com.br/auth',
          {},
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: authorization,
            },
          },
        )
        .pipe(
          map((resp) => {
            console.log(resp);
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
  }
}
