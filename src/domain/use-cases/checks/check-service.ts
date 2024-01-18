import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogReposity } from "../../repository/log.repository";


interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

    // inyección de dependencias
    constructor(
        private readonly logRepository: LogReposity,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ) {
    }

    public async execute( url: string ): Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( ` Error on check service ${ url } ` );
            }

            const log = new LogEntity( `Service ${url} working`, LogSeverityLevel.low )
            this.logRepository.saveLog( log );
            this.successCallback && this.successCallback(); // si existe la función, la ejecuta, asi se evita el error de undefined

            return true;

        } catch (error) {
            
            const errorMessage = ` ${ url } is not ok. ${ error }`;
            const log = new LogEntity( errorMessage, LogSeverityLevel.high );
            this.logRepository.saveLog( log );

            this.errorCallback && this.errorCallback( errorMessage );
            return false;
        }

    }
}