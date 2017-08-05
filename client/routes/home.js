function getHome(app) {
	return function(req, res) {
		res.render('home.ejs');
	};
}
module.exports = getHome;