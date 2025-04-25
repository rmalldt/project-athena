const { renderDOM } = require('./helpers');
const path = require('path');

let dom;
let document;

describe('dashboard.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./dashboard.html');
    document = await dom.window.document;

    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: key => store[key] || null,
        setItem: (key, value) => (store[key] = value.toString()),
        removeItem: key => delete store[key],
        clear: () => (store = {}),
      };
    })();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('redirect to index page when the athena project logo is clicked', async () => {
    // Arrange
    const { document, window } = dom.window;

    const anchor = document.querySelector('nav a');
    const location = new URL(anchor.getAttribute('href'), window.location.href)
      .href;
    const actual = location.split('/').slice(-1).pop();

    // Act
    const expected = 'index.html';
    expect(actual).toBe(expected);
  });

  it('redirect to logout page when the logout button is clicked', () => {
    // Arrange
    const { document, window } = dom.window;

    const anchor = document.querySelector('.buttons a');
    const location = new URL(anchor.getAttribute('href'), window.location.href)
      .href;
    const actual = location.split('/').slice(-1).pop();

    // Act
    const expected = 'index.html';
    expect(actual).toBe(expected);
  });

  it('redirect to quiz page when any topic card is clicked', () => {
    // Arrange
    const clickableDiv = document.querySelector('.classes div[onclick]');
    const anchor = clickableDiv.getAttribute('onclick');
    const actual = anchor.split('/').slice(-1).pop().slice(0, -2);

    // Act
    const expected = 'quiz.html';
    expect(actual).toBe(expected);
  });
});

//const quizDiv = document.querySelector('.classes div[onclick]')
