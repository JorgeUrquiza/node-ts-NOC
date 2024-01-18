import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// LogReposity va a permitir poder llamar metodos de dataSources
export abstract class LogReposity {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
};
