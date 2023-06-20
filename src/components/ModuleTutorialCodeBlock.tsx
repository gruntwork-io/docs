import React, { useEffect, useState } from "react"

import { Buffer } from "buffer"

import CodeBlock from "@theme/CodeBlock"

export type ModuleTutorialCodeBlockProps = {
  github_username: string
  mixpanel_project_id: string
}

export const ModuleTutorialCodeBlock: React.FC<
  ModuleTutorialCodeBlockProps
> = ({ github_username, mixpanel_project_id }) => {
  const [githubUsername, setGithubUsername] = useState("unknown")

  const getGitHubUsernameFromQueryString = () => {
    // Grab query string params out of URL
    const urlParams = new URLSearchParams(window.location.search)
    let githubUsername = urlParams.get("github_username")
    if (githubUsername == null) {
      githubUsername = "unknown"
    }
    return githubUsername
  }

  const codeBlockSnippet = `import uuid
import json
from urllib.request import urlopen, Request


def lambda_handler(event, context):
    url = "https://t.gruntwork.io/"

    github_username = "%github_username%"

    # This code sends an event to Gruntwork that includes your GitHub username to
    # signify that you completed the tutorial.
    # We don't track anything else about you other than your GitHub username, and we
    # only use this data internally to understand who has completed our tutorial

    payload = {
        "id": uuid.uuid4().hex,
        "event": "ModuleTutorialDeploymentComplete",
        "eventProps": {
            "distinct_id": github_username,
            "github_username": github_username,
            "$insert_id": uuid.uuid4().hex
        }
    }

    headers = {
      "accept": "text/plain",
      "content-type": "application/json"
    }

    httprequest = Request(url, headers=headers, method="POST",
    data=json.dumps(payload).encode('utf-8'))

    response_object = {}

    with urlopen(httprequest) as response:
        response_object["operation_status"] = "Success"
        response_object["statusCode"] = response.status
        response_object["body"] = f"Hello, {github_username}, from Gruntwork!"

    return response_object
    `
  const [codeSnippet, setCodeSnippet] = useState("")

  const produceCodeSnippet = (githubUsername: string): string => {
    return codeBlockSnippet
      .replace("%github_username%", githubUsername)
  }

  useEffect(() => {
    setGithubUsername(getGitHubUsernameFromQueryString())
  }, [])

  useEffect(() => {
    setCodeSnippet(produceCodeSnippet(githubUsername))
  }, [githubUsername])

  return <CodeBlock language="python">{codeSnippet}</CodeBlock>
}

export default ModuleTutorialCodeBlock
