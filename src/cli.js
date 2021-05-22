#!/usr/bin/env node
require('dotenv').config()

const program = require("commander");
const chalk = require("chalk");
const axios = require('axios')

const BASE_URL=process.env.BASE_URL
const API_KEY =process.env.API_KEY

program
  .version("1.0.0")
  .description("Simple CLI tool to shorten URL");

program
  .command("shorten <url>")
  .description("Shortens your url. url is a required paremeter")
  .action((url) => {
      const data = JSON.stringify({url:url})
    axios.post(BASE_URL, 
        data,
        {headers: {'Content-Type': 'application/json','x-api-key': API_KEY }})
      .then(res=>{
        console.log(`Shortened URL : ${chalk.cyan(` ${res?.data?.result_url}`)}`)
      })
      .catch(err=>console.log(chalk.red(`Something went wrong !`)))
  })

  program.parse(process.argv);
