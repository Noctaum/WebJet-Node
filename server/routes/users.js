const	express = require("express"),
		router = express.Router({mergeParams: true}),
		users= require("../models/users");

router.get("/data2", function(req, res){
	if(req.query.sort){
		users.find({}).sort(req.query.sort).exec(function(err, data) {
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
		users.find(userFilter, function(err, data){
	        if(err){
	            console.log("ERROR!");
	        } else{
	            res.json(data);
	        }
	    });
	} else {
	    users.find({}, function(err, data){
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

router.put('/data2/:id', function(req, res){
	users.findByIdAndUpdate(req.body._id, req.body, function(err, foundUser){
		if(err){
			console.log("ERROR!");
		} else {
			res.json({});
		}
	});
});

module.exports = router;