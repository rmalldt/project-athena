const { renderDOM } = require('./helpers');
const path = require('path')

let dom;
let document;

describe('index.html', () => {
    // Before each test set virtual dom so we can use the document property to
    // perform our tests.
    beforeEach(async () => {
      dom = await renderDOM('./index.html');
      document = await dom.window.document;
    });
  
    it('has a button', () => {
      // Arrange
      const btn = document.querySelector('button');
  
      // Assert
      expect(btn).toBeTruthy;
      expect(btn.innerHTML).toBe('Login');
    });
  
    it('redirect to registration page when the signup button is clicked', () => {
      // Arrange
      const {document, window} = dom.window;

      const anchor = document.querySelector(".signup-content a")
      const location = new URL(anchor.getAttribute('href'), window.location.href).href
      const actual = location.split('/').slice(-1).pop()

      // Act
      const expected = "registration.html"
      expect(actual).toBe(expected);

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
  
    // it('displays dark mode', () => {
    //   // Arrange
    //   const body = document.querySelector('body');
    //   const darkModeBtn = document.querySelector('#dark-mode');
  
    //   // Act
    //   darkModeBtn.click();
  
    //   // Assert
    //   expect(body.className).toBe('dark-mode');
    // });
  
    // it('adds the input value to the h1', () => {
    //   // Arrange
    //   const form = document.querySelector('form');
    //   const h1 = document.querySelector('h1');
    //   const input = document.querySelector('#name');
    //   input.value = 'emile';
  
    //   // Act
    //   form.dispatchEvent(new dom.window.Event('submit'));
  
    //   // Assert
    //   expect(h1.innerHTML).toContain(input.value);
    // });
  
    // it('switches back to light mode', () => {
    //   // Arrange
    //   const body = document.querySelector('body');
    //   const darkModeBtn = document.querySelector('#dark-mode');
  
    //   // Act
    //   darkModeBtn.click();
    //   darkModeBtn.click();
  
    //   // Assert
    //   expect(body.className).toBe('');
    // });
  
    // it('test', () => {
    //   expect({ id: 1, name: 'Kale' }).toEqual({ id: 1, name: 'Kale' });
    // });
  });
   


