// src/app.ts
import express from 'express';
import axios from "axios";

const app = express();
const port = 5249;
let cookies: string[] = [""];

app.get('/', async (req, res) => {
    let status: number = 0;
    try {
        await axios.get('http://localhost/api/products/health',
            {
                headers: {
                    Cookie: cookies
                }
            }).then(res => status = res.status)
    } catch (error: any){
        status = error.response.status;
        console.log(error.response.status)
    }
    res.send(JSON.stringify(status));
});

app.listen(port,async () => {
    try{
        await axios.post('http://localhost/api/users/signin', {"email": "admin@czapoba.pl", "password": "admin"})
            .then((response) => {
                const setCookie = response.headers["set-cookie"];
                if (setCookie === undefined) return;
                cookies = setCookie;
            })
        console.log("Successfully logged in to czapoba")
    } catch (e){
        console.log(e)
    }
    console.log(`Server is running on port ${port}`);
});