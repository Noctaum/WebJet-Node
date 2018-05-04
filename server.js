
const bodyParser     = require('body-parser'),
      mongoose       = require("mongoose"),
      cors           = require('cors'),
	  express        = require('express'),
	  app            = express();
	 
mongoose.connect("mongodb://localhost/task1DB");
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));
app.use(cors());

let films = require("./server/routes/films"),
    users = require("./server/routes/users"),
    files = require("./server/routes/files");

app.use(films);
app.use(users);
app.use(files);

//////////////ALL FOR FIRST TABLE//////////////

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



//////////////ALL FOR SECOND TABLE//////////////



// for(let i = 0; i < 100; i++){
// var secondUser = new users2({
//     firstName: "William",
//     secondName: "Terner",
//     text: "I'm artist.",
//     value: "44",
// });
// secondUser.save();
// }



//////////////ALL FOR THIRD TABLE (Settings)//////////////



app.listen(8096, function(){
    console.log("Started!");
});

