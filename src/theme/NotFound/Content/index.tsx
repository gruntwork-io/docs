import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';

export default function NotFoundContent({className}: Props): JSX.Element {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <h1>Page Not Found</h1>
          <p>The requested page could not be found.</p>
          <p>If you believe this is a mistake, or you followed a link here from a Gruntwork site, please <a href="/support">contact our support team</a> and let us know.</p>
        </div>
      </div>
    </main>
  );
}
