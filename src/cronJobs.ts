import cron from "node-cron";
import checkHealth from "./checkHealth";

const cronJobs = (cookies: string[], interval: number, updateCookies?: Function) => {
    cron.schedule(`*/${interval} * * * *`,async () => {
        await checkHealth("products", cookies, updateCookies);
        await checkHealth("offers", cookies, updateCookies);
        await checkHealth("contractors", cookies, updateCookies);
    })
    console.log(`${new Date().toLocaleTimeString()}| Scheduled cronJobs`)
}

export default cronJobs;