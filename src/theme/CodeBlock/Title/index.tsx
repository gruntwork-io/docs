import type {ReactNode} from 'react';
import type {Props} from '@theme/CodeBlock/Title';
import {parseCustomizableValues} from '@site/src/components/CustomizableValue';

export default function CodeBlockTitle({children}: Props): ReactNode {
  if (typeof children === 'string') {
    return parseCustomizableValues(children);
  }
  return children;
}
