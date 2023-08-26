import { Home, Distance } from "./home";
import { DBHome, DBContactInfo, InsertResult } from "./db";
export {
    DBHome,
    DBContactInfo,
    Home,
    Distance,
    InsertResult
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GCLOUD_MAPS_API_KEY: string;
        GLOUD_MAPS_BASE_URL: string;
        ROOT_REDFIN_URL: string;
        MOUNT_TABOR_REDFIN_URL: string;
        SELLWOOD_MORELAND_REDFIN_URL: string;
        DB_HOST:string;
        DB:string;
        DB_USER:string;
        DB_PASSWORD:string;
        DB_PORT:string;
        MOUNT_TABOR_ADDRESS:string;
      }
    }
}