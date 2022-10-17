import React, { useEffect, useState } from "react"
import Admonition from "@theme/Admonition"

 type Discussion = {
  title: string;
  body:string;
  bodyHTML: string;
  number: number;
  answer: { bodyHTML: string, body:string };
};


type GitHubProps = {
  discussion: Discussion
}

export const PWithData: React.FunctionComponent<{rawHTML:string}> = ({ rawHTML }) => {
  return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
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

export const GitHub: React.FunctionComponent<GitHubProps> = ({ discussion }) => {
  const [body, setBody] = useState("")
  const [answerBody, setAnswerBody] = useState("")

  useEffect(() => {
    const rawAnswer:string = discussion.bodyHTML;
    const answerNoZenDeskLink = rawAnswer.replace(/<hr>\n<ins[\s\S]*<\/ins>/gim, "");
    
    setBody(answerNoZenDeskLink)
    setAnswerBody(discussion.answer?.bodyHTML)
  }, [])
  return (
    <>
      <div>
        <a
          href={`https://github.com/gruntwork-io/knowledge-base/discussions/${discussion.number}`}
          className="link-button">
          View full discussion in GitHub
        </a>
      </div>
      <PWithData rawHTML={body} />


      <div style={{marginTop: "2.5rem"}}>
        <Admonition type="tip" title="Answer">
          <PWithData rawHTML={answerBody} />
        </Admonition>
      </div>


      {
      /** 
       * The following two paragraphs are visually hidden. They are here only because we use them as the raw text that will be
       * indexed by Algolia's crawlers. Above, we're using GitHub's actual HTML and injecting that directly into the DOM
       * so that we can get all of the proper formatting of code blocks, lists, etc from GitHub without having to
       * re-figure out how to render. Unfortunately, we were not able to inject this HTML directly into the raw `mdx`
       * files as that resulted in loads of subsequent compilation errors when we tried to `build` the docs site.
       *
       */
      }
      <p style={visuallyHidden}>{discussion.body}</p>
      <p style={visuallyHidden}>{discussion.answer?.body}</p>
    </>
  )
}

export default GitHub
