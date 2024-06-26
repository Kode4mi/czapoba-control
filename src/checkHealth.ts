import ServiceRecords from "./ServiceRecords";
import {Status, ServiceRoute} from "./types";
import axios from "axios";
import DiscordAlerts from "./DiscordAlerts";
import tryToLogin from "./tryToLogin";

const checkHealth = async (serviceRoute: string, cookies: string[], updateCookies?: Function) => {
    if (!(serviceRoute in ServiceRoute)){
        return {code: 404, message: `Bad request! There is no service route: '${serviceRoute}'`}
    }

    console.log(`${new Date().toLocaleTimeString()}| Checking health of ${serviceRoute}...`);

    const records: ServiceRecords = new ServiceRecords();
    const status: Status = {code: 0, message: ""};
    try {
        await axios.get(`${process.env.APP_URL}/${serviceRoute}/health`,
            {
                headers: {
                    Cookie: cookies
                }
            }).then(res => {
            status.code = res.status;
            status.message = res.statusText;
        })
    } catch (error: any){
        status.code = error.response.status;
        status.message = error.response.statusText;

        if(status.code === 401 && updateCookies !== undefined) {
            updateCookies(await tryToLogin());
            return status;
        }
        const discordAlerts = new DiscordAlerts();
        await discordAlerts.send(serviceRoute, status);
    }
    await records.write(serviceRoute, status);
    console.log(`${new Date().toLocaleTimeString()}| ${serviceRoute} health:`, status);

    return status;
}

export default checkHealth;