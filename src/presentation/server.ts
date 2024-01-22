import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogReposityImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


// Guardar en un archivo en file system 
const fsLogRepository = new LogReposityImpl(
    new FileSystemDataSource(),
); 

// Guardar en mongo
const MongoLogRepository = new LogReposityImpl(
    new MongoLogDatasource(),
);

// Guardar en postgres
const PostgresLogRepository = new LogReposityImpl(
    new PostgresLogDatasource(),
);
    
const emailService = new EmailService();


export class Server {

    public static async start() {
        console.log('Server started...')

        // TODO: Mandar email con caso de uso
        new SendEmailLogs(
            emailService,
            fsLogRepository,
        ).execute(
            [ 'email@gmail.com' ] // aqui va el email de quien recibe el correo de logs 
        )

        // TODO: Buscamos los logs por nivel en la base de datos
        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
        
        CronService.createJob( 
            '*/5 * * * * *', // cada 5 segundos
            () => {
                const url = 'https://www.google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, MongoLogRepository, PostgresLogRepository],
                    () => console.log(`${ url } is ok `),
                    (error) => console.log(error)
                ).execute( url );
            }
        );
    };

};