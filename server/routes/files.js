const 	express = require("express"),
		router = express.Router({mergeParams: true}),
		files = require("../models/files"),
		multer         = require('multer');
		
let storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString());
	}
});

let upload = multer({storage: storage});

router.get('/files', function(req, res){
	files.find({}, function(err, data){
		if(err){
			console.log("ERROR!");
		} else{
			res.json(data);
		}
	});
});

router.post('/files', upload.single('upload'), function(req, res){
	files.create({
		filmName: req.body.name,
		realName: req.file.originalname,
		path:     req.file.path,
		type:     req.file.mimetype
	}, function(err, newFilm){
		if(err){
			console.log("ERROR!");
		} else{
			res.json({});
		}
	});
});	

module.exports = router;