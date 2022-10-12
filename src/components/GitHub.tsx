import React, { useEffect, useState } from "react"
import Admonition from "@theme/Admonition"

type GitHubProps = {
  json: any
}

export const PWithData: React.FunctionComponent<GitHubProps> = ({ json }) => {
  return <div dangerouslySetInnerHTML={{ __html: json }} />
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
          View full discussion in GitHub
        </a>
      </div>
      <PWithData json={body} />


      <div style={{marginTop: "2.5rem"}}>
        <Admonition type="tip" title="Answer">
          <PWithData json={answerBody} />
        </Admonition>
      </div>



      <p style={visuallyHidden}>{json.body}</p>
      <p style={visuallyHidden}>{json.answer?.body}</p>
    </>
  )
}

export default GitHub
