import { Octokit } from "@octokit/rest"; 
import axios from 'axios'; 


const TOKEN_GITHUB = process.env.TOKEN_GITHUB; 
const REPO_OWNER = "ady09"; 
const REPO_NAME = "tauri-menu-bar";  

// Gemini API configuration
const GEMINI_API_URL = process.env.API_ENDPOINT; 
const GEMINI_API_KEY = process.env.API_KEY; 

const octokit = new Octokit({
  auth: TOKEN_GITHUB
});

async function getPRDiff(prNumber) {
  try {
    const { data } = await octokit.pulls.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      pull_number: prNumber,
      mediaType: {
        format: 'diff',
      },
    });
    console.log("pr data")
    console.log(data)
    return data; 
  } catch (error) {
    console.error('Error fetching PR diff:', error.message);
    throw error;
  }
}


async function generateTestCases(diff) {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      prompt: `Analyze the following code changes and generate test cases in natural language (English).
      Ensure to cover normal cases and highlight edge cases:
      ${diff}
      Return the test cases in a readable format. `,
      key: GEMINI_API_KEY,
    });
    console.log(response.data)
    
    return response.data; 
  } catch (error) {
    console.log(GEMINI_API_URL);
    console.error(`Error generating test cases: ${GEMINI_API_URL}`, error.message);
    throw error;
  }
}

async function postCommentToPR(prNumber, testCases) {
  try {
    const commentBody = `### AI-Generated Test Cases\n\n${testCases}`;
    
    await octokit.issues.createComment({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: prNumber, 
      body: commentBody,
    });

    console.log('Test cases added to PR as comment.');
  } catch (error) {
    console.error('Error posting comment to PR:', error.message);
    throw error;
  }
}

async function handlePR(prNumber) {
  try {
    // Step 1: Get the PR diff
    const diff = await getPRDiff(prNumber);

    // Step 2: Send the diff to Gemini API to generate test cases
    const testCases = await generateTestCases(diff);

    // Step 3: Post the generated test cases as a comment on the PR
    await postCommentToPR(prNumber, testCases);
  } catch (error) {
    console.error('Error handling PR:', error.message);
  }
}

async function getLatestOpenPullRequest() {
    try {
      const { data } = await octokit.pulls.list({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'open',
        per_page: 1, 
        sort: 'created', 
        direction: 'desc' 
      });
  
      if (data.length === 0) {
        console.log('No open pull requests found.');
        return null; 
      }
  
      const latestPR = data[0];
      console.log(`Latest PR #${latestPR.number}: ${latestPR.title}`);
      return latestPR.number; 
    } catch (error) {
      console.error('Error fetching latest PR:', error.message);
      throw error;
    }
  }

  async function handleLatestPR() {
    try {
      const latestPRNumber = await getLatestOpenPullRequest();
      
      if (latestPRNumber) {
        await handlePR(latestPRNumber); 
      }
    } catch (error) {
      console.error('Error handling the latest PR:', error.message);
    }
  }


  handleLatestPR();