import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.pugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    attachments?: Attachment[];
    htmlBody: string;
    subject: string;
    to: string | string[];
}

interface Attachment {
    filename: string;
    path: string;
}


// todo: Attachments

export class EmailService {

    // Configurar el transporter de nodemailer para enviar correos electronicos
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor( ) {}

    // Mandar un correo electronico
    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { htmlBody, subject, to, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                attachments,
                html: htmlBody,
                subject,
                to,
            })

            // console.log(sentInformation);

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            })

            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            })
            
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h1>Logs de sistema - NOC </h1>
        <p>Estos son los logs de sistema</p>
        <p> Ver los Logs adjuntos </p>
        <p>Mail enviado desde NodeJs</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            attachments,
            htmlBody,
            subject,
            to,
        })

    }

}