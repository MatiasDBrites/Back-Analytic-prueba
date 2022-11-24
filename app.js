import express from "express";
import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


// Init Express
const app = express();
const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const view_id= "280702326";

const jwt = new google.auth.JWT(
  process.env.client_email,
  null,
  process.env.private_key.replace(/\\n/g, "\n"),
  scopes
);

async function getViews() {
  try {
    
    /* original */ 
    await jwt.authorize();

    const response = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: "ga:pageviews"
    });

    
    console.log(response.data)
    // console.log(response)

    // console.dir(response);
    // var as = JSON.parse(response);
    // console.log(as);

  } catch (error) {
      console.log(error);    
  }
}
getViews();



export default app;
