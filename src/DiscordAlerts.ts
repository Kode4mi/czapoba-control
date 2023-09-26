import axios from "axios";
import {Status} from "./types";

const colors: {[key: number]: number } = {
    4: 16737792,
    5: 13382451,
}

export default class DiscordAlerts {
    public async send(serviceName: string, status: Status) {
        try {
            await axios.post("https://discord.com/api/webhooks/1155928479502696479/BPwpuz-msBSy8Vz_oCke8YFwSdSTIfi1FBVUXi0zQzTaNGHdOW-0FJh04KVlT7B1rd_t", {
                "username": "CZAPOBA control",
                "avatar_url": "https://i.imgur.com/c5WKNBG.png",
                "embeds": [
                    {
                        "title": serviceName.toUpperCase(),
                        "description": `Problem detected in **${serviceName}**`,
                        "color": colors[Math.floor(status.code/100)] || 13382451,
                        "fields": [
                            {
                                "name": status.code,
                                "value": status.message
                            }
                        ],
                        "footer": {
                            "text": `Time: ${new Date().toLocaleTimeString()}`,
                        }
                    }
                ]
            });

            console.log("Alert sent on discord")
        } catch (error) {
            console.error('An error occurred while sending alert', error);
        }
    }
}