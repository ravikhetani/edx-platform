import React from 'react';
import ReactDOM from 'react-dom';
import { clampHtmlByWords } from './clamp-html';

let container;
const scriptTag = '<script src="/asset-v1:edX+testX+1T2021+type@asset+block/script.js"></script>';
const stylesheet = '<link rel="stylesheet" type="text/css" href="/asset-v1:edX+testX+1T2021+type@asset+block/introjs.css">';

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ClampHtml', () => {
  test.each([
    ['', 0, ''],
    ['a b', 0, '…'],
    ['a b', 1, 'a…'],
    ['a  b  c', 2, 'a b…'],
    ['a <i>aa ab</i> b', 2, 'a <i>aa…</i>'],
    ['a <i>aa ab</i> <em>ac</em>', 2, 'a <i>aa…</i>'],
    ['a <i>aa <em>aaa</em></i>', 2, 'a <i>aa…</i>'],
    ['a <i>aa <em>aaa</em> ab</i>', 3, 'a <i>aa <em>aaa…</em></i>'],
    ['a <i>aa ab</i> b c', 4, 'a <i>aa ab</i> b…'],
    [scriptTag + 'a b c', 2, scriptTag + 'a b…'],
    [stylesheet + 'a b c', 2, stylesheet + 'a b…'],
    [scriptTag + stylesheet + 'a b c', 2, scriptTag + stylesheet + 'a b…'],
  ])('clamps by words: %s, %i', (input, wordsLeft, expected) => {
    const div = ReactDOM.render(<div dangerouslySetInnerHTML={{ __html: input }} />, container);
    clampHtmlByWords(div, wordsLeft);
    expect(div.innerHTML).toEqual(expected);
  });
});
