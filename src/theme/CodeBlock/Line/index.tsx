import clsx from 'clsx';
import type {Props} from '@theme/CodeBlock/Line';

import styles from './styles.module.css';
import CustomizableValue from '../../../components/CustomizableValue';


function parseAndReplaceSpecialKeysInTokens(tokens) {
  const nodes = [];
  let tempContent = '';
  let started = false;

  for (const token of tokens) {
    tempContent += token.props.children; // Access token.props.children

    const regex = /\$\$([a-zA-Z0-9]+)\$\$/g;
    let match = regex.exec(tempContent);

    if (match) {
      const key = match[1];
      const id = key.toLowerCase();
      const placeholder = key.replace(/([A-Z])/g, ' $1').trim().toLowerCase();

      nodes.push(
        <CustomizableValue
          key={id}
          id={id}
          placeholder={placeholder}
          fieldId={key}
        />
      );

      tempContent = tempContent.slice(match.index + match[0].length);
      started = false;
    } else if (tempContent.startsWith('$$')) {
      started = true;
    } else if (started) {
      continue;
    } else {
      nodes.push(token);
      tempContent = '';
    }
  }

  // if (tempContent) {
  //   nodes.push(token);
  // }

  return nodes;
}

function parseAndReplaceSpecialKeysInTokensOld(tokens) {
  const nodes = [];
  console.log({tokens})
  for (const token of tokens) {

    const content = token.props.children;
    const regex = /\$\$([a-zA-Z0-9]+)/g; // Match $$ID$$
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      // Add the text before the match
      if (match.index > lastIndex) {
        //token.props.children = token.props.children.substring(lastIndex, match.index)
        nodes.push(token);
      }

      const key = match[1];
      const id = key.toLowerCase();
      const placeholder = key.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
      console.log('ADDING CUSTOM THING')
      nodes.push(
        <CustomizableValue
          key={id}
          id={id}
          placeholder={placeholder}
          fieldId={key}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add the remaining text after the last match
    if (lastIndex < content.length) {
      //token.props.children = token.props.children.substring(lastIndex)
      nodes.push(token);
    }
  }

  return nodes;
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

  console.log(line)

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        parseAndReplaceSpecialKeysInTokens(lineTokens)
      )}
      <br />
    </span>
  );
}
