const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000 ;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var secondName = req.body.lname;
  var emailId = req.body.email;
  var data = {
    members: [{
      email_address: emailId,
      status: "subscribed",
      FNAME: firstName,
      LNAME: secondName
    }]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/d0169a23d6",
    method: "POST",
    headers: {
      "Authorization": "testing 59ff38e847e8a3c9765d5fe5a643023e-us17"
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(response.statusCode);
    }
  });
});

app.post("/failure", function(req, res) {

  res.redirect("/");
});


app.listen(port, function(req, res) {
  console.log("Server is running on port 3000");
});


//59ff38e847e8a3c9765d5fe5a643023e-us17

//d0169a23d6
