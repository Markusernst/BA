function getOperationsbericht(app) {
	return function(req, res) {
		res.render('operationsbericht.ejs');
	};
}
module.exports = getOperationsbericht;