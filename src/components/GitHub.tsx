import React, { useEffect, useState } from "react"

type GitHubProps = {
  discussion: {bodyHTML:string; number:number, answer: {bodyHTML:string}}
}

export const GitHub: React.FunctionComponent<GitHubProps> = ({ discussion }) => {

  const rawQuestion:string = discussion.bodyHTML;
  const questionNoZenDeskLink = rawQuestion.replace(/<hr>\n<ins[\s\S]*<\/ins>/gim, "");
  return (
    <>
      <div>
        <a
          href={`https://github.com/gruntwork-io/knowledge-base/discussions/${discussion.number}`}
          className="link-button">
          View complete discussion in GitHub
        </a>
      </div>

      <h4>Question:</h4>
      <div dangerouslySetInnerHTML={{ __html: questionNoZenDeskLink  }} />

      <hr />

      <h4>Answer:</h4>
      <div dangerouslySetInnerHTML={{ __html: discussion.answer.bodyHTML }} />
    </>
  )
}

export default GitHub
