function getBootstrapTreeviewJS(app) {
	return function(req, res, next) {		
  		var options = {
    		root: __dirname + "../../../../bower_components/bootstrap-treeview/dist/",
    		dotfiles: "deny",
    		headers: {
    		    "x-timestamp": Date.now(),
    		    "x-sent": true
    		}
  		};

  		var fileName = req.params.jsname;
  		res.sendFile(fileName, options, function (err) {
    		if (err) {
      		console.log(err);
      		res.status(err.status).end();
    		} else {
      		//console.log('Sent:', fileName);
    		}
  		});
	};
}
module.exports = getBootstrapTreeviewJS;