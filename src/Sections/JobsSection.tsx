"use client";

import * as React from "react";
import cheerio from "cheerio";
import axios from "axios";
import { load } from 'cheerio';

export default function JobsSection(props: any) {
    React.useEffect(() => {
        const fetchData = async () => {
            const url: string = "https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/";
            const response = await fetch(url);
            const body = await response.text();
            let $ = load(body);
            let jobs = $("#jobs-list")

            // const { data } = await axios("https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/");
            // // console.log("first data is:", data)
            // const $ = cheerio.load(data);
            // const jobs = $("#jobs__detail");
            console.log("JOBS ARE", jobs);
        };
        fetchData();
    }, []);
    return <div className="container mx-auto flex flex-col">Hello Jobs section</div>;
}
