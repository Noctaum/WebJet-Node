
const bodyParser     = require('body-parser'),
      mongoose       = require("mongoose"),
      cors           = require('cors'),
      multer         = require('multer'),
	  express        = require('express'),
	  app            = express();

mongoose.connect("mongodb://localhost/task1DB");
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));
app.use(cors());

let storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString());
	}
});

let upload = multer({storage: storage});

//////////////ALL FOR FIRST TABLE//////////////

let filmsSchema = new mongoose.Schema({
    Name: String,
    year: Number,
    author: String,
    category: Number,
    text: String,
});

let films = mongoose.model("films", filmsSchema);

// for(let i = 0; i < 100; i++){
// var newFilm = new films({
//     Name: "Law Abiding Citizen",
//     year: 2009,
//     author: "F. Gary Gray",
//     category: 1,
//     text: "A frustrated man decides to take justice into his own hands after a plea bargain sets one of his family's killers free. He targets not only the killer but also the district attorney and others involved in the deal.",
// });
// newFilm.save();
// }

let metodsData1 = {
	saveData: function(req, res){
		films.findByIdAndUpdate(req.body._id, req.body, function(err, foundFilm){
			if(err){
				console.log("ERROR!");
			} else {
				res.json({});
			}
		});
	},
	showData: function(req, res){
		films.find({}, function(err, data){
		    if(err){
		        console.log("ERROR!");
		    } else{
		        res.json(data);
		    }
		});
	},
	deleteData: function(req, res){
		films.findByIdAndRemove(req.body._id, function(err){
    		if(err){
    			console.log("ERROR!");
    		} else{
    			res.json({});
			}
		});
	},
	addData: function(req, res){
		films.create(req.body, function(err, newFilm){
			if(err){
				console.log("ERROR!");
			} else{
				res.json({});
			}
		});
	}	
};

app.get('/data1', metodsData1.showData);	
app.put('/data1/:id', metodsData1.saveData);
app.delete('/data1/:id', metodsData1.deleteData);
app.post('/data1', metodsData1.addData);

//////////////ALL FOR SECOND TABLE//////////////

let usersSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    text: String,
    value: String,
    created: {type: Date, default: Date.now}
});

let users2 = mongoose.model("Users2", usersSchema);

// for(let i = 0; i < 100; i++){
// var secondUser = new users2({
//     firstName: "William",
//     secondName: "Terner",
//     text: "I'm artist.",
//     value: "44",
// });
// secondUser.save();
// }

app.get("/data2", function(req, res){
	if(req.query.sort){
		users2.find({}).sort(req.query.sort).exec(function(err, data) {
			if(err){
	            console.log("ERROR!");
	        } else{
	            res.json(data);
	        }
		});
	}
	else if(req.query.filter && req.query.start == 0){
		let user = req.query.filter
		let userFilter = {
			firstName: new RegExp(user.firstName, 'i'),
			secondName: new RegExp(user.secondName, 'i'),
			text: new RegExp(user.text, 'i'),
			value: new RegExp(user.value, 'i'),
		}
		users2.find(userFilter, function(err, data){
	        if(err){
	            console.log("ERROR!");
	        } else{
	            res.json(data);
	        }
	    });
	} else {
	    users2.find({}, function(err, data){
	        if(err){
	            console.log("ERROR!");
			} else {
	        	if(req.query.start){
	        		let info = {
	        			data: data.slice(req.query.start,(+req.query.start)+(+req.query.count)),
	        			pos: req.query.start,
    				}
	        		res.json(info);
	        	} else {
	            	res.json({
	            		data: data.slice(0,10),
	            		pos: 0,
	            		total_count: data.length,
	            	});
	        	}
	        }
	    });
	}
});

app.put('/data2/:id', function(req, res){
	users2.findByIdAndUpdate(req.body._id, req.body, function(err, foundUser){
		if(err){
			console.log("ERROR!");
		} else {
			res.json({});
		}
	});
});

//////////////ALL FOR THIRD TABLE (Settings)//////////////

var filesSchema = new mongoose.Schema({
	filmName: String,
    realName: String,
    path:     String,
    type:     String,
    date:     {type: Date, default: Date.now}
});

let files = mongoose.model("files", filesSchema);

app.get('/files', function(req, res){
	files.find({}, function(err, data){
	    if(err){
	        console.log("ERROR!");
	    } else{
	        res.json(data);
	    }
	});
});

app.post('/files', upload.single('upload'), function(req, res){
	console.log(req.file);
	console.log(req.body);
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

app.listen(8096, function(){
    console.log("Started!");
});

