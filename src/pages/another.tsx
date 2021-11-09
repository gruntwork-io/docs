import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  const htmlContent = ""
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React pageasjsdkjfhsdkjfhsdkjf</p>
      <div dangerouslySetInnerHTML={{__html:htmlContent}}></div>
    </Layout>
  );
}