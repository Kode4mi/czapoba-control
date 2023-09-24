import ServiceRecords from "./ServiceRecords";
import {Status, ServiceRoute} from "./types";
import axios from "axios";

const checkHealth = async (serviceRoute: string, cookies: string[]) => {
    if (!(serviceRoute in ServiceRoute)){
        return {code: 404, message: `Bad request! There is no service route: '${serviceRoute}'`}
    }

    console.log(`Checking health of ${serviceRoute}...`);

    const records: ServiceRecords = new ServiceRecords();
    const status: Status = {code: 0, message: ""};
    try {
        await axios.get(`http://localhost/api/${serviceRoute}/health`,
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
    }
    await records.write(serviceRoute, status);
    console.log(`${serviceRoute} health:`, status);

    return status;
}

export default checkHealth;