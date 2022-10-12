import React, { useEffect, useState } from "react"

type GitHubProps = {
  json: any
}

export const PWithData: React.FunctionComponent<GitHubProps> = ({ json }) => {
  return <p dangerouslySetInnerHTML={{ __html: json }} />
}


const visuallyHidden:React.CSSProperties = {
  overflow: "hidden",
  position: "absolute",
  clip: "rect(0 0 0 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  border: "0"
}

export const GitHub: React.FunctionComponent<GitHubProps> = ({ json }) => {
  const [body, setBody] = useState("")
  const [answerBody, setAnswerBody] = useState("")

  useEffect(() => {
    const rawAnswer:string = json.bodyHTML;
    const answerNoZenDeskLink = rawAnswer.replace(/<hr>\n<ins[\s\S]*<\/ins>/gim, "");
    
    setBody(answerNoZenDeskLink)
    setAnswerBody(json.answer?.bodyHTML)
  }, [])
  return (
    <>
      <div>
        <a
          href={`https://github.com/gruntwork-io/knowledge-base/discussions/${json.number}`}
          className="link-button">
          View complete discussion in GitHub
        </a>
      </div>
      <h4>Question:</h4>
      <PWithData json={body} />

      <hr />

      <h4>Answer:</h4>
      <PWithData json={answerBody} />

      <p style={visuallyHidden}>{json.body}</p>
      <p style={visuallyHidden}>{json.answer?.body}</p>
    </>
  )
}

export default GitHub
