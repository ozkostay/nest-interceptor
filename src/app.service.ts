import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(arg): string {

    // if (Math.random() > 0.5) {
    //   throw new Error('Искусственная ошибка');
    // }

    return 'Hello World!' + arg + '\n';
  }
}
