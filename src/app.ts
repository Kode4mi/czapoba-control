// src/app.ts
import express from 'express';
import axios from "axios";
import {Status} from "./types";
import ServiceRecords from "./ServiceRecords";
import checkHealth from "./checkHealth";

const app = express();
const port = 5249;
let cookies: string[] = [""];

app.get('/:serviceRoute', async (req, res) => {
    let status: Status = {code: 0, message: "unknown"};
    status = await checkHealth(req.params.serviceRoute, cookies);
    res.send(JSON.stringify(status));
});

app.get('/', async (req, res) => {
    const serviceRecords = new ServiceRecords();
    res.send(await serviceRecords.getRecords());
});

app.listen(port,async () => {
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
    } catch (error: any){
        console.log("Failed to log in")
        serviceRecords.write("auth", {code: error.response.status, message: error.response.statusText})
    }
    console.log(`Server is running on port ${port}`);
});