import ServiceRecords from "./ServiceRecords";
import axios from "axios";
import DiscordAlerts from "./DiscordAlerts";
import {Status} from "./types";

const tryToLogin = async () => {
    let cookies: string[] = [""];
    const serviceRecords = new ServiceRecords();
    try{
        if (!process.env.LOGIN_URL) {console.error("LOGIN URL NOT SPECIFIED"); return [""]};
        await axios.post(process.env.LOGIN_URL, {"email": process.env.EMAIL, "password": process.env.PASSWORD})
            .then((response) => {
                const setCookie = response.headers["set-cookie"];
                if (setCookie === undefined) return;
                cookies = setCookie;
                serviceRecords.write("auth", {code: response.status, message: response.statusText})
            })
        console.log(`${new Date().toLocaleTimeString()}| Successfully logged in to czapoba`)
    } catch (error: any) {
        console.log(`${new Date().toLocaleTimeString()}| Failed to log in`)
        const status: Status = {code: error.response.status, message: error.response.statusText}
        await serviceRecords.write("auth", status)

        const discordAlerts = new DiscordAlerts();
        await discordAlerts.send("auth", status);
    }
    return cookies;
}

export default tryToLogin;