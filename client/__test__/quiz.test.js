const { renderDOM } = require('./helpers');
const path = require('path');

let dom;
let document;

describe('login.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./quiz.html');
    document = await dom.window.document;
  });

  it('has a button', () => {
    // Arrange
    const btn = document.querySelector('#quiz-start');

    // Assert
    expect(btn).toBeTruthy;
    expect(btn.innerHTML).toBe('Ready? Start the quiz');
  });
});
