import React, { useEffect, useState } from "react";

import { Buffer } from 'buffer';

import CodeBlock from "@theme/CodeBlock"


export type ModuleTutorialCodeBlockProps = {
  github_username: string,
  mixpanel_project_id: string
}

export const ModuleTutorialCodeBlock: React.FC<ModuleTutorialCodeBlockProps> = ({
  github_username,
  mixpanel_project_id
}) => {


  const mixpanelProjectId = "5736098d8918525aa0a75f1d6dda8321"
  const buffer = new Buffer(mixpanelProjectId);
  const base64data = buffer.toString('base64');

  const getGitHubUsernameFromQueryString = () => {
    // Grab query string params out of URL
    const urlParams = new URLSearchParams(window.location.search);
    let githubUsername = urlParams.get('github_username');
    if (githubUsername == null) {
      githubUsername = 'unknown'
    }
    return githubUsername
  }

  const codeBlockSnippet = `import uuid 
import base64
import json
from urllib.request import urlopen, Request


def lambda_handler(event, context):
    url = "https://api.mixpanel.com/track"

    github_username = "%github_username%"

    # This code sets up our mixpanel project ID and sends an event into Mixpanel
    # that includes your GitHub username to signify that you completed the tutorial
    # We don't track anything else about you other than your GitHub username, and we
    # only use this data internally to understand who has completed our tutorial
    mixpanelClientId = "%mixpanel_project_id%"
    tok = base64.b64decode(mixpanelClientId).decode('utf-8')

    payload = [
    {
        "event": "ModuleTutorialDeploymentComplete",
        "properties": {
        "token": tok,
        "distinct_id": github_username,
        "github_username": github_username,
        "$insert_id": uuid.uuid4().hex
        }
    }]

    headers = {
      "accept": "text/plain",
      "content-type": "application/json"
    }

    httprequest = Request(url, headers=headers,
    data=json.dumps(payload).encode('utf-8'))

    response_object = {}

    with urlopen(httprequest) as response:
        text = ""
        mixpanel_response_text = response.read().decode()
        if mixpanel_response_text == "1":
        text = "Success"
        else:
        text = "Unknown error"

        response_object["operation_status"] = text
        response_object["statusCode"] = response.status
        response_object["body"] = f"Hello, {github_username}, from Gruntwork!"

    return response_object
    `

  const produceCodeSnippet = (githubUsername: string): string => {
    return codeBlockSnippet.replace('%github_username%', githubUsername).replace('%mixpanel_project_id%', base64data)
  }

  const [githubUsername] = useState(getGitHubUsernameFromQueryString());

  const [codeSnippet] = useState(produceCodeSnippet(githubUsername));

  return (
    <CodeBlock language="python">
      {codeSnippet}
    </CodeBlock>
  )
}

export default ModuleTutorialCodeBlock
