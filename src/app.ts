// src/app.ts
import 'dotenv/config'
import express from 'express';
import axios from "axios";
import {serviceRouteTab, Status} from "./types";
import ServiceRecords from "./ServiceRecords";
import checkHealth from "./checkHealth";
import tryToLogin from "./tryToLogin";
import cronJobs from "./cronJobs";

const app = express();
const port = 5249;
let cookies: string[] = [""];

const updateCookies = (newCookies: string[]) => {
    cookies = newCookies;
}

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
    cookies = await tryToLogin();
    console.log(`${new Date().toLocaleTimeString()}| Server is running on port ${port}`);
    for (const srv of serviceRouteTab) {
        await checkHealth(srv, cookies);
    }
    cronJobs(cookies, 5, updateCookies);
});