import {
    CallHandler,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    InternalServerErrorException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    console.log({
                        status: "success",
                        data: {
                            methodKey: context.getHandler().name, 
                            className: context.getClass().name,
                        }
                    });
                }),
                catchError(err => {
                    console.log({
                        status: "fail",
                        data: {
                            methodKey: context.getHandler().name, 
                            className: context.getClass().name,
                            errorMessage: err, 
                        }
                    });
                    return throwError(new InternalServerErrorException());
                })
            );
    }

}
