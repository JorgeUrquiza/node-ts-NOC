import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogReposityImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogReposityImpl(
    new FileSystemDataSource()
); 
const emailService = new EmailService();


export class Server {

    public static start() {
        console.log('Server started...')

        // Mandar email con caso de uso
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository,
        ).execute(
            [ 'acavaelemail@gmail.com' ] // aqui va el email de quien recibe el correo de logs 
        )

        
        // CronService.createJob( 
        //     '*/5 * * * * *', // cada 5 segundos
        //     () => {
        //         const url = 'https://www.google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok `),
        //             (error) => console.log(error)
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );

        //     }
        // );

    };
};