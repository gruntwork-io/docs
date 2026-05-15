import type {ReactNode} from 'react';
import type {Props} from '@theme/CodeBlock/Title';
import {parseCustomizableValues} from '@site/src/components/CustomizableValue';

// This swizzle intentionally returns the title content unwrapped. The parent
// CodeBlockLayout in @docusaurus/theme-classic renders us as:
//
//   <div className={styles.codeBlockTitle}><Title>{metadata.title}</Title></div>
//
// so the styled wrapper comes from the parent slot. If a future Docusaurus
// upgrade changes that contract (e.g. expects Title to render its own
// wrapper), code-block titles will lose their styling — restore the wrapper
// here at that point.
export default function CodeBlockTitle({children}: Props): ReactNode {
  if (typeof children === 'string') {
    return parseCustomizableValues(children);
  }
  return children;
}
