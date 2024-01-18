import { LogReposity } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDataSource } from '../../domain/datasources/log.datasource';


export class LogReposityImpl implements LogReposity {

    constructor(
        private readonly logDatasource: LogDataSource
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog( log );
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLevel );
    }

}