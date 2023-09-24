import * as fs from 'fs-extra';
import { Status } from "./types";

export default class ServiceRecords {
    public jsonData: any;
    public path: string = "./src/records.json";

    constructor() {
        this.init();
    }

    public async init() {
        try {
            this.jsonData = await fs.readJSON(this.path);
            console.log("JSON pobrany")
        } catch (error: any) {
            console.error(error)
        }
    }

    public async write(serviceName: string, status: Status) {
        this.jsonData[serviceName] = status;
        await fs.writeJSON(this.path, this.jsonData, { spaces: 2 });
    }
}