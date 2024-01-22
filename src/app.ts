import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.pugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async() => {
    await main();
})();

// es async por que se conecta a la base de datos y luego inicia el servidor
async function main() {
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    Server.start();
}