const getNonInclusiveTerms = require("./non-inclusive-terms");

const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');

async function run() { 
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);



    const workspace = process.env.GITHUB_WORKSPACE;
    console.log(`Workspace.: ${workspace}`);
    const dir = `${workspace}/`;


    const nonInclusiveTerms = await getNonInclusiveTerms();
    nonInclusiveTerms.forEach(phrase => {

      console.log(phrase.term);
    });

    // list all files in the directory
    const files = fs.readdirSync(dir);
    
    // files object contains all files names
    files.forEach(file => {
      // log them on console
      console.log(file);
    });




    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();