// src/app.ts
import express from 'express';
import axios from "axios";
import {Status} from "./types";
import ServiceRecords from "./ServiceRecords";

const app = express();
const port = 5249;
let cookies: string[] = [""];

app.get('/', async (req, res) => {
    const records: ServiceRecords = new ServiceRecords();
    const status: Status = {code: 0, message: ""};
    try {
        await axios.get('http://localhost/api/products/health',
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
    await records.write("products", status);
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