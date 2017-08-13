exports.homePage = function (req, res) {
	console.log(req.body);
	res.render('index', { title: 'Horizon Challenge' });
};

exports.gotData = function (req, res) {
	console.log(req.body);
	const info = req.body
	res.render('index', { title: 'Horizon Challenge', info })
}