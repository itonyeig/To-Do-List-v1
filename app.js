const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
let items = ['buy food','buy drink'];

app.get('/', function (req, res){
    let today = new Date();
    let currentDay = today.getDay();
    let day = "";
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    console.log(today.toLocaleDateString("en-US", options));
    day = today.toLocaleDateString("en-US", options);


    app.post('/', function(req, res){
        let item = req.body.newItem;
        // Stops the user from posting an empty string
        item = item.trimStart()
        if (item !== ""){
            items.push(item);
        }
        console.log(items);
        res.redirect('/');
    });
    res.render('list', {
        kindOfDay: day,
        newListItems: items
    });
});


app.listen(3000, function(){
    console.log('Server is running on port 3000');
})