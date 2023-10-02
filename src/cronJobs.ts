import cron from "node-cron";
import checkHealth from "./checkHealth";
import {serviceRouteTab} from "./types";
import CheckHealth from "./checkHealth";

const cronJobs = (cookies: string[], interval: number, updateCookies?: Function) => {
    cron.schedule(`*/${interval} * * * *`,async () => {
        for (const srv of serviceRouteTab) {
            await CheckHealth(srv, cookies, updateCookies)
        }
    })
    console.log(`${new Date().toLocaleTimeString()}| Scheduled cronJobs`)
}

export default cronJobs;