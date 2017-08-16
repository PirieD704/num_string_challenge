# Number String Challenge

For this coding challenge, I chose to develop a node-based web application that allows for the user to pick any positively incrementing number range between 1 and 1,000,000, convert each number in the sequence into a string, remove the spaces, and combine them together into one complete string.  The user can view the length of the resulting string and also pick a letter to find the percentage that it occurs with the string.

### Relevant Technologies Used:
1. Node.JS
2. Jade
3. SASS CSS Preprocessor
4. Hosted on AWS - Linux Version - Ubuntu

[www.davidapirie.com:3010](www.davidapirie.com:3010)


### Relavent Code

#### Main String-Building Algorithm

The first thing that was needed was the relavent string elements to make up all the combinations of number strings we would be creating. This resulted in creating two arrays: one with the strings for 0 through 19 as 1 - 9 will be used repeatedly and 11 - 19 only when we are talking about the teens; the other string is for multiples of ten (excluding ten since it is included in our first list). It's important that the first array contain 0 although it won't be selectable in our app becuase it allows the array index to match the number it holds.

```javascript
const uTwentydigits = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const TenMultiples = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
```

This provides the basis for our strings to be built. The function, named numberConverter is what is used to convert each number to a string.  It takes one number at a time and filters it down to the necessary parts. The converter can create any number accurately up to 999,999.

```javascript
function numberConverter(n){
  if (n < 20) return uTwentydigits[n];
  let singleDigit = n%10;
  if (n < 100) return TenMultiples[~~(n/10)-2] + (singleDigit? uTwentydigits[singleDigit]: "");
  if (n < 1000) return uTwentydigits[~~(n/100)] +"hundred" + (n%100 != 0? numberConverter(n%100) : "" );
  return numberConverter(~~(n/1000)) + "thousand" + (n%1000 != 0? numberConverter(n%1000): "");
}
```

This works by first identifying the size of the number. The bottom to lines catch numbers between 100 - 1000 and 1000 and serve to concatinate in either "thousand" or "hundred" since neither of these string exist in our current arrays. The real work horse of the algorithm is the upper three lines.  The first handling our first array exclusively since all of those strings are unique. The second line will always contain singleDigit due to the modulus of n being based off of 10.  This will always produce a number 0 - 9.  in the 3rd line, this variable serves as the boolean value for our ternary operator in the second part of the concatination string. if 0 is the single digit, the boolean is false and an empty string "" is returned, else the first array is searched for a match. This is actually backwards from the real logic because it really reads "Exists? if so - Do this : else : return empty string". For the tenMultiples in the first part a special operator is used called the double tidle "~~" which is a double NOT bitwise operator if you want to be fancy. It's used here as a better alternative for Math.floor() as it simply removes everything to the right of the decimal and will never return a NaN.  N is divided by 10 to reduce to the single digit representation of the tens digit, floored by the double tilde and then subtracted by 2 in order to line up with the array index of our second string array (twenty is the start of the array for our second one).

Beyond that it gets reflexive with determining our single digit from n/100 to find the digit in the hundreds spot. The final line uses recursion to build out any string sequence that would come before the word "thousand" as it all follows the same pattern produced in the first four lines. The end sections of lines 4 and 5 also use recursion as part of the ternary operators. The ternary operators serve to determine if a round number such as 300 or 123,000. If n modulus 100 or 1000 does not result in a zero, numberconverter will be called again and passed the modulus of n. Else, it's passed an empty string.

It should be noted that this string build already leaves out spacing but could incorporate that if needed. This challenge calls for no spacing.


#### String Builder algorithm

I set this up to take two parameters so that a start and an end point could be chosen.

```javascript
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
```

It first handles the existance of a selection so that on page load, an error isn't passed and instead, an empty string is.  The second error handlers ensures a valid range is given by checking that start is, in fact, smaller than end. Our HTML5 form makes sure our range is correct, no negative numbers are given, and that a number is returned but a manual check is needed to determine if the parameter follow the right order. We then instantiate an array, run a for loop that pushes each increment of i run through the number converter to the newly created array. i and the end range are set by the parameters start and end.  When returned, a join command accompanies the array to pass one complete string. ex. "onetwothreefourfive".


#### LetterCount algorithm

For this algorithm, I made use of regex to easily identify the desired letter that was entered. Our HTML5 form ensurs that we are only passed back one character but we could match greater sequences with the same formula if needed. The trick here was to make the regex expression dynamic so that it would accept a new and different input each time it was called.

```javascript
exports.letterCount = (word, letter) => {
  if (!letter) {
  	return "Enter a letter"
  } else {
    const regex = new RegExp(letter, "gi");
    const finalAmount = word.match(regex).length;
    return finalAmount;	
  }
};
```

Again, first we handle the existance of for the case of first-time page load. We have to make use of a regex constructor called 'RegExp' this builds our regular expression and allows us to insert a variable into the function, making it dynamic. The "g" on the end is standard for regex but I included the 'i' to make it case insensitive.  The '+' means that  We also pass the finished string from the the buildSting function and run a .match method on it with the regex as the given parameter. this matches all instances of the given letter.