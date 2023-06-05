import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// If the user's GitHub username is present in the query params, likely because it has been passed through via a link from aperture, 
// and we're on our "Deploying your first module" tutorial page, then inject the user's GitHub username into their copy-paste-able 
// terraform configuration. This ties together the user flow of: aperture => docs site tutorial => gruntwork tutorial service (goal state)
const injectGitHubUsernameIfPresent = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let githubUsername = urlParams.get('github_username');
  if (githubUsername == null) {
    githubUsername = 'unknown'
  }
  // Rewrite the %unknown% placeholder in the main.py configuration on the tutorial page
  document.body.innerHTML = document.body.innerHTML.replace('%unknown%', githubUsername);
  // Inject our centralized Gruntwork tutorial service's stable endpoint into the main.py configuration, 
  // so that the customer's deployed lambda automatically calls our service when they invoke their demo lambda
  document.body.innerHTML = document.body.innerHTML.replace('%endpoint_url%', "https://h1t1m9ck07.execute-api.us-east-1.amazonaws.com/tutorial-service/post");
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

