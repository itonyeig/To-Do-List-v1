const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));

const items = [];
const workItems = [];

app.get('/', function (req, res){
    let day = date.getDate();
    res.render('list', {
        listTittle: day,
        newListItems: items
    });
});

app.post('/', function(req, res){
    // console.log(req.body);
        let item = req.body.newItem;

        if (req.body.list === 'Work') {
            item = item.trimStart()
            if (item !== ""){
                workItems.push(item);
            }
            res.redirect('/work');
        } else {
            // Stops the user from posting an empty string
            item = item.trimStart()
            if (item !== ""){
                items.push(item);
            }
            // console.log(items);
            res.redirect('/');
        }
    });

app.get('/work', function(req, res){
    res.render('list',{
        listTittle: 'Work List',
        newListItems: workItems
    });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
})

//branch2