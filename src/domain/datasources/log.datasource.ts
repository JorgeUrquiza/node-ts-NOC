import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// Nadie puede crear una instancia de esta clase abstracta
export abstract class LogDataSource {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
};
