const { renderDOM } = require('./helpers');
const path = require('path')

let dom;
let document;

describe('registration.html', () => {
    beforeEach(async () => {
      dom = await renderDOM('./registration.html');
      document = await dom.window.document;
    });

    it('redirect to index page when the athena project logo is clicked', () => {
        // Arrange
        const {document, window} = dom.window;
  
        const anchor = document.querySelector("nav a")
        const location = new URL(anchor.getAttribute('href'), window.location.href).href
        const actual = location.split('/').slice(-1).pop()
  
        // Act
        const expected = "index.html"
        expect(actual).toBe(expected);
  
      });

      it('redirect to login page when the login button is clicked', () => {
        // Arrange
        const {document, window} = dom.window;
  
        const anchor = document.querySelector(".buttons a")
        const location = new URL(anchor.getAttribute('href'), window.location.href).href
        const actual = location.split('/').slice(-1).pop()
  
        // Act
        const expected = "login.html"
        expect(actual).toBe(expected);
  
      });

    //   it('redirect to login page when the signup button is clicked', () => {
    //     // Arrange
    //     const {document, window} = dom.window;
  
    //     const anchor = document.querySelector(".buttons a")
    //     const location = new URL(anchor.getAttribute('href'), window.location.href).href
    //     const actual = location.split('/').slice(-1).pop()
  
    //     // Act
    //     const expected = "login.html"
    //     expect(actual).toBe(expected);
  
    //   });

  });
   

  //const quizDiv = document.querySelector('.classes div[onclick]')

