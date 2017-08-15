const express = require('express');
const numberConverter = require('./numberConverter');

// here we build our string

exports.buildString = (start, end) => {
  if(!start || !end) {
  	return '';
  } else if (start >= end) {
    return "enter a valid range"
  } else { 
  	let totalArrToString = [];
    for(let i = start; i <= end; i++){
      totalArrToString.push(numberConverter(i))
    };
    return totalArrToString.join('');
  };
  return "retry entry"
};
