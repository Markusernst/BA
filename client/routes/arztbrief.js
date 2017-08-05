function getArztbrief(app) {
	return function(req, res) {
		res.render('arztbrief.ejs');
	};
}
module.exports = getArztbrief;