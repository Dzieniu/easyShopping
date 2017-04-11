exports.pages = function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render(filename );
};

exports.index = function(req, res){
  res.render('index', {message:"Hello!!!"});
};

