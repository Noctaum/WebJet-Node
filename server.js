
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

app.listen(8096, function(){
    console.log("Started!");
});

