const 	express = require("express"),
		router = express.Router({mergeParams: true}),
		films = require("../models/films");

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

router.get('/data1', metodsData1.showData);	
router.put('/data1/:id', metodsData1.saveData);
router.delete('/data1/:id', metodsData1.deleteData);
router.post('/data1', metodsData1.addData);

module.exports = router;