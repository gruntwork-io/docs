// Renders $$CUSTOMIZABLE_VALUE$$ placeholders in code block titles.
import type {ReactNode} from 'react';
import type {Props} from '@theme/CodeBlock/Title';
import {parseCustomizableValues} from '@site/src/components/CustomizableValue';

export default function CodeBlockTitle({children}: Props): ReactNode {
  return typeof children === 'string' ? parseCustomizableValues(children) : children;
}
