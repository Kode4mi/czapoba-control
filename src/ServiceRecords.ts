import * as fs from 'fs-extra';
import { Status } from "./types";

export default class ServiceRecords {
    private jsonData: any;
    public path: string = "./records.json";

    constructor() {
        this.init();
    }

    public getRecords = async () => {
        await this.init()
        return this.jsonData;
    }

    public async init() {
        try {
            await fs.access(this.path, fs.constants.F_OK)
        } catch (error: any) {
            await fs.writeJSON(this.path, {}, { spaces: 2 })
            console.error(error)
        }
        this.jsonData = await fs.readJSON(this.path)
    }

    public async write(serviceName: string, status: Status) {
        this.jsonData[serviceName] = status;
        await fs.writeJSON(this.path, this.jsonData, { spaces: 2 });
    }
}