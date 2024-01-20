import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogReposity } from '../../repository/log.repository';


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly LogRepository: LogReposity,
    ){}


    async execute(to: string | string[]) {

        try {

            const send = await this.emailService.sendEmailWithFileSystemLogs( to );
            if ( !send ) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Log email sent`,
                origin: 'send-email-logs.ts',
            })
            this.LogRepository.saveLog( log );

            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts',
            })
            this.LogRepository.saveLog( log );

            return false;
        }

    }
}