const { letterCount }= require('../components/letterCount');
const { buildString }= require('../components/buildString');

exports.homePage = (req, res) => {
	console.log(req.body);
	let info = {start: '', end: '', letter: '', builtStringLength: '' , finalLetterCount: '' };
	res.render('index', { title: 'Horizon Challenge', info});
};

exports.gotData = (req, res) => {
	console.log(req.body);
	let info = req.body;
	//create our info object again with the return from the form
	console.log(info);
	// build our string and store in a variable
	let finalWord = buildString(info.start, info.end)
	console.log(letterCount(finalWord, info.letter))
	console.log(finalWord)
	console.log(finalWord.length)
	console.log("after final word")
	// use a ternary operator to check for error string when the range is incorrect
	info.builtStringLength = finalWord == "enter a valid range" ? finalWord : finalWord.length;
	info.finalLetterCount = letterCount(finalWord, info.letter)
	res.render('index', { title: 'Horizon Challenge', info})
}