import React, {cloneElement, type ReactElement, type ReactNode} from 'react';
import clsx from 'clsx';
import LineToken from '@theme/CodeBlock/Line/Token';
import type {Props} from '@theme/CodeBlock/Line';

import styles from './styles.module.css';
import CustomizableValue from '../../../components/CustomizableValue';

type Token = Props['line'][number];

function LineBreak() {
  return <br />;
}

function fixLineBreak(line: Token[]) {
  const singleLineBreakToken =
    line.length === 1 && line[0]!.content === '\n' ? line[0] : undefined;
  if (singleLineBreakToken) {
    return [{...singleLineBreakToken, content: ''}];
  }
  return line;
}

/**
 * Scans a list of rendered tokens for `$$id$$` markers (which may straddle
 * token boundaries) and replaces them with <CustomizableValue id={id} />.
 * Surrounding token elements are cloned so their styling/classes are preserved
 * when split.
 */
function replaceCustomizeableValues(tokens: ReactElement[]): ReactNode[] {
  const newTokens: ReactNode[] = [];
  let captured = '';
  let withinCustomizableValue = false;
  let skipFirstChar = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;
    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;

    const content: string = token.props.children ?? '';

    let initialIndex = 0;
    if (skipFirstChar) {
      initialIndex = 1;
      skipFirstChar = false;
    }

    for (let j = initialIndex; j < content.length; j++) {
      const currentChar = content[j];
      let nextChar = j < content.length - 1 ? content[j + 1] : null;
      let usedNextToken = false;
      if (
        nextChar == null &&
        nextToken != null &&
        (nextToken.props.children?.length ?? 0) > 0
      ) {
        nextChar = nextToken.props.children[0];
        usedNextToken = true;
      }

      if (currentChar === '$' && nextChar === '$') {
        if (withinCustomizableValue) {
          newTokens.push(
            <CustomizableValue
              key={captured + newTokens.length}
              id={captured}
            />,
          );
        } else if (captured.length > 0) {
          newTokens.push(
            cloneElement(token, {key: newTokens.length}, captured),
          );
        }

        captured = '';
        withinCustomizableValue = !withinCustomizableValue;
        j += 2;
        skipFirstChar = usedNextToken;
        if (j >= content.length) {
          break;
        }
      }
      captured += content[j];
    }
    if (captured.length > 0 && !withinCustomizableValue) {
      newTokens.push(cloneElement(token, {key: newTokens.length}, captured));
      captured = '';
    }
  }
  return newTokens;
}

export default function CodeBlockLine({
  line: lineProp,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): ReactNode {
  const line = fixLineBreak(lineProp);
  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });

  const lineTokens = line.map((token, key) => {
    const tokenProps = getTokenProps({token});
    return (
      <LineToken key={key} {...tokenProps} line={line} token={token}>
        {tokenProps.children}
      </LineToken>
    );
  });

  return (
    <div {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        replaceCustomizeableValues(lineTokens)
      )}
      <LineBreak />
    </div>
  );
}
