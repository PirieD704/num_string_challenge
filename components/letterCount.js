const express = require('express');

exports.letterCount = (word, letter) => {
  // you must use the RegExp operator to include the param 'letter' so it is dynamic when someone enters in the input field
  // note you don't need the beginning and end slashes (/) when doing the RegExp operator
  if (!letter) {
  	return "Enter a letter"
  } else {
    const regex = new RegExp(letter + "+", "gi");
    const finalAmount = word.split(regex).length;
    return finalAmount;	
  }
};
