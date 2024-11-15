import clsx from 'clsx';
import type {Props} from '@theme/CodeBlock/Line';
import { cloneElement } from 'react';

import styles from './styles.module.css';
import CustomizableValue from '../../../components/CustomizableValue';

/**
 * replaceCustomizeableValues takes a list of tokens and identifies customizable values
 * marked by a start and end token, '$$'.
 * It returns a new list of tokens with the customizable values replaced with a CustomizableValue component.
 * If a customizable value begins or ends in the middle of a token, the token is split into two tokens.
 */
function replaceCustomizeableValues(tokens) {
  // The list of tokens including the customizable value components
  let newTokens = [];
  // A string that is being built up to capture the content of the current token, used to create a new token
  let captured = '';
  // A boolean indicating that we are currently within a customizable value
  let withinCustomizableValue = false;

  // A boolean indicating that we should skip the first character of the next token
  let skipFirstChar = false;

  // Loop over each token
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    let nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;

    let content = token.props.children;

    // Loop over each character in the token
    let initialIndex = 0;
    if (skipFirstChar) {
      // Start the loop at 1 to skip the first character
      initialIndex = 1;
      skipFirstChar = false;
    }

    for (let j = initialIndex; j < content.length; j++) {
      // The current charcter and the next character
      // The next character may be in the next token, so we need to look ahead
      let currentChar = content[j];
      let nextChar = j < content.length - 1 ? content[j + 1] : null;
      // Track if we used the next token to get the next character
      let usedNextToken = false;
      if (nextChar == null && nextToken != null && nextToken.props.children.length > 0) {
        nextChar = nextToken.props.children[0];
        usedNextToken = true;
      }

      // If the current and next characters are both '$', we have found the start or end of a customizable value
      if (currentChar === '$' && nextChar === '$') {
        if (withinCustomizableValue) {
          // We have found the end of a customizable value, create a new token for the customizable value
          newTokens.push(
            <CustomizableValue
              key={captured + newTokens.length}
              id={captured}
            />
          );
        } else if (captured.length > 0) {
          // We have found the start of a customizable value, if we have captured any content, create a new token
          // to preserve the previous content
          let newToken = cloneElement(token, {key: newTokens.length}, captured)
          newTokens.push(newToken)
        }

        // Reset the captured content and toggle the withinCustomizableValue flag
        captured = '';
        withinCustomizableValue = !withinCustomizableValue;
        // Skip the next two characters in this token, which will be the opening or closing $$
        j += 2;
        // If the marker was split across two tokens, we need to skip the first character of the next token
        // to remove it from the output
        skipFirstChar = usedNextToken;
        if (j >= content.length) {
          break;
        }
      }
      captured += content[j];
    }
    if (captured.length > 0 && !withinCustomizableValue) {
      let newToken = cloneElement(token, {key: newTokens.length}, captured)
      newTokens.push(newToken)
      captured = '';
    }
  }
  return newTokens;
}

export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): JSX.Element {
  if (line.length === 1 && line[0]!.content === '\n') {
    line[0]!.content = '';
  }

  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });

  const lineTokens = line.map((token, key) => (
    <span key={key} {...getTokenProps({token})} />
  ));

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        replaceCustomizeableValues(lineTokens)
      )}
      <br />
    </span>
  );
}
