"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

    Author: Michael Brady
    Date: 10/27/22 
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
//Call init() on load of page
window.onload = init();

function init(){
   //Store buttons in calcButtons
   var calcButtons = document.getElementsByClassName("calcButton"); 
   //Add onclick event listener to each button
   for (var i = 0; i < calcButtons.length; i++){
      calcButtons[i].onclick = buttonClick;
   }
   //Add onkeydown event listener to calcWindow
   document.getElementById("calcWindow").onkeydown = calcKeys;
}

function buttonClick(e){
   //Initialize variables
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;
   var buttonValue = e.target.value;
   //Perform actions according to button that is pressed
   switch(buttonValue) {
      case 'del':
        calcValue = '';
        break;
      case 'bksp':
        calcValue = eraseChar(calcValue);
        break;
      case 'enter':
        calcValue += ' = ' + evalEq(calcValue, calcDecimal) + '\n';
        break;
      case 'prev':
        calcValue += lastEq(calcValue);
        break;
      default:
        calcValue = calcValue + buttonValue;
    }
    //Display answer
    document.getElementById('calcWindow').value = calcValue;
    //Put cursor focus inside calcWindow
    document.getElementById('calcWindow').focus()
}

function calcKeys(e){
   //Initialize variables
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;
   //Perform actions according to key that is pressed
   switch(e.key) {
      case "Delete":
        calcValue = '';
        break;
      case 'Enter':
        e.preventDefault();
        calcValue += ' = ' + evalEq(calcValue, calcDecimal) + '\n';
        break;
      case 'ArrowUp':
        e.preventDefault();
        calcValue += lastEq(calcValue);
        break;
    }
   //Display answer
   document.getElementById("calcWindow").value = calcValue;
}

/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}