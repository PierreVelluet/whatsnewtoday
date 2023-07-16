"use client";

import * as React from "react";
import cheerio from 'cheerio'
import axios from 'axios'

export default function JobsSection(props: any) {

    const Cors = require('cors')
    const cors = Cors({
        methods: ['POST'],
      })

      function runMiddleware(req: Request, res: Response, fn:any) {
        return new Promise((resolve, reject) => {
          fn(req, res, (result:any) => {
            if (result instanceof Error) {
              return reject(result)
            }
      
            return resolve(result)
          })
        })
      }

  
    React.useEffect(() => {
        const fetchData = async () => {
            console.log("ok")
            // const data  = await fetch('https://crossorigin.me/https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/').then(res =>  res.json())
            const data  = await fetch("https://crossorigin.me/https://www.onf.fr/nous-rejoindre/nos-offres#iframe-offres/").then(d => d.text()).then(d => console.log(d))
            // const $ = cheerio.load(data)
            // console.log($)
            // const title = $('#ctitle').text()
            // const lastScraped = new Date().toISOString()
            // return {
            //   props: { title, lastScraped },
            //   revalidate: 10, // rerun after 10 seconds
            // }
            console.log(data)
        };
        fetchData();
    }, []);
    return <div className="container mx-auto flex flex-col">Hello Jobs section</div>;
}
