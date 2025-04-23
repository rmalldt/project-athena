const { renderDOM } = require('./helpers');

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
  
    // it('h1 is empty when website loads', () => {
    //   // Arrange
    //   const h1 = document.querySelector('h1');
  
    //   // Assert
    //   expect(h1).toBeTruthy;
    //   expect(h1.innerHTML).toContain('');
    // });
  
    // it('displays Hello there! when the btn is clicked', () => {
    //   // Arrange
    //   const btn = document.querySelector('button');
    //   const h1 = document.querySelector('h1');
  
    //   // Act
    //   btn.click();
  
    //   // Assert
    //   expect(h1.innerHTML).toContain('Hello there!');
    // });
  
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
   


