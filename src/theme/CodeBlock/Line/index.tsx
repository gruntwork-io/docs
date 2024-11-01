import clsx from 'clsx';
import type {Props} from '@theme/CodeBlock/Line';
import { cloneElement } from 'react';

import styles from './styles.module.css';
import CustomizableValue from '../../../components/CustomizableValue';

function replaceCustomizeableValues(tokens) {
  let newTokens = [];
  let captured = '';
  let capturing = false;
  for (let token of tokens) {
    let content = token.props.children;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '$' && i < content.length - 1 && content[i + 1] === '$') {
        if (capturing) {
          newTokens.push(
            <CustomizableValue
              key={captured + newTokens.length}
              id={captured}
            />
          );
        } else {
          let newToken = cloneElement(token, {key: newTokens.length}, captured)
          newTokens.push(newToken)
        }

        captured = '';
        capturing = !capturing;
        i += 2;
        if (i >= content.length) {
          break;
        }
      }
      captured += content[i];
    }
    if (captured.length > 0 && !capturing) {
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
