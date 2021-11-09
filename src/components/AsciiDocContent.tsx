import React from 'react';

export default function AsciiDocContent(args:any): JSX.Element {
    return (
        <div className="container" dangerouslySetInnerHTML={{__html: args.content}} />
    );
  }
  