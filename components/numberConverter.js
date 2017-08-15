const express = require('express');

//our number generation code

// our Strings to split and build our master string out of
let uTwentydigits = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
let TenMultiples = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");


function numberConverter(n){
  if (n < 20) return uTwentydigits[n];
  let singleDigit = n%10;
  if (n < 100) return TenMultiples[~~(n/10)-2] + (singleDigit? uTwentydigits[singleDigit]: "");
  if (n < 1000) return uTwentydigits[~~(n/100)] +"hundred" + (n%100 == 0? "": numberConverter(n%100));
  return numberConverter(~~(n/1000)) + "thousand" + (n%1000 != 0? numberConverter(n%1000): "");
}

module.exports = numberConverter;