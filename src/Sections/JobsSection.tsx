"use client";

import * as React from "react";
import { load } from "cheerio";
import puppeteer from "puppeteer";

export default function JobsSection(props: any) {
    React.useEffect(() => {
        const fetchData = async () => {

            // //////////////////////////////////////////////////////////////////

            // Launch the browser and open a new blank page
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Navigate the page to a URL
            await page.goto("https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/");

            // Set screen size
            await page.setViewport({ width: 1080, height: 1024 });

            // Type into search box
            await page.type(".search-box__input", "automate beyond recorder");

            // Wait and click on first result
            const searchResultSelector = ".jobs";
            await page.waitForSelector(searchResultSelector);
            await page.click(searchResultSelector);

            // Locate the full title with a unique string
            const textSelector = await page.waitForSelector("jobs");
            const fullTitle = await textSelector?.evaluate((el) => el.textContent);

            // Print the full title
            console.log('The title of this blog post is "%s".', textSelector);

          

            //// //////////////////////////////////////////////////////////////////
            // const url: string = "https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/";
            // const response = await fetch(url);
            // const body = await response.text();
            // let $ = load(body);
            // let jobs = $(".bcrumb");

            // console.log("JOBS ARE", jobs);

            await browser.close();
        };

        fetchData();
    }, []);
    return <div className="container mx-auto flex flex-col">Hello Jobs section</div>;
}
