import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { Buffer } from 'buffer';

// If the user's GitHub username is present in the query params, likely because it has been passed through via a link from aperture, 
// and we're on our "Deploying your first module" tutorial page, then inject the user's GitHub username into their copy-paste-able 
// terraform configuration. This ties together the user flow of: aperture => docs site tutorial => gruntwork tutorial service (goal state)
// 
// Separately, regardless of whether or not the user's GitHub username is present in the query params, we must base64 encode our 
const injectGitHubUsernameIfPresent = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let githubUsername = urlParams.get('github_username');
  if (githubUsername == null) {
    githubUsername = 'unknown'
  }
  // Rewrite the %unknown% placeholder in the main.py configuration on the tutorial page
  document.body.innerHTML = document.body.innerHTML.replace('%unknown%', githubUsername);

  // Base64 encode the Mixpanel project ID - not to obscure it, but to at least provide one extra step to prevent blind scrapers from picking it up
  const mixpanelClientId = "5736098d8918525aa0a75f1d6dda8321"

  const buffer = new Buffer(mixpanelClientId);
  const base64data = buffer.toString('base64');

  document.body.innerHTML = document.body.innerHTML.replace('%mixpanel_project_id%', base64data);
}

export function onRouteDidUpdate({ location, previousLocation }) {
  // Only fire this logic on our "Deploying your first module" tutorial page
  if (location.pathname != "/iac/getting-started/deploying-a-module") return;
  injectGitHubUsernameIfPresent();
}

if (ExecutionEnvironment.canUseDOM) {
  // We also need to setCodeRevealTriggers when the page first loads; otherwise,
  // after reloading the page, these triggers will not be set until the user
  // navigates somewhere.
  window.addEventListener('load', () => {
    setTimeout(injectGitHubUsernameIfPresent, 1000);
  });
}

