import axios from "axios";
import {Status} from "./types";

const colors: {[key: number]: number } = {
    4: 16737792,
    5: 13382451,
}

export default class DiscordAlerts {
    public async send(serviceName: string, status: Status) {
        try {
            if (!process.env.DISCORD_WEBHOOK_URL) return console.error("Discord webhook url not specified");
            await axios.post(process.env.DISCORD_WEBHOOK_URL, {
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

            console.log(`${new Date().toLocaleTimeString()}: Alert sent on discord`)
        } catch (error) {
            console.error(`${new Date().toLocaleTimeString()}: An error occurred while sending alert`, error);
        }
    }
}