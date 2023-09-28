import ServiceRecords from "./ServiceRecords";
import axios from "axios";
import DiscordAlerts from "./DiscordAlerts";
import {Status} from "./types";

const tryToLogin = async () => {
    let cookies: string[] = [""];
    const serviceRecords = new ServiceRecords();
    try{
        await axios.post('http://localhost/api/users/signin', {"email": "admin@czapoba.pl", "password": "admin"})
            .then((response) => {
                const setCookie = response.headers["set-cookie"];
                if (setCookie === undefined) return;
                cookies = setCookie;
                serviceRecords.write("auth", {code: response.status, message: response.statusText})
            })
        console.log("Successfully logged in to czapoba")
    } catch (error: any) {
        console.log("Failed to log in")
        const status: Status = {code: error.response.status, message: error.response.statusText}
        await serviceRecords.write("auth", status)

        const discordAlerts = new DiscordAlerts();
        await discordAlerts.send("auth", status);
    }
    return cookies;
}

export default tryToLogin;