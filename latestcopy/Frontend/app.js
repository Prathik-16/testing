const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


mongoose.connect(
    "mongodb+srv://NAAZ:12345@cluster0.arfzm.mongodb.net/eventmanagement?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
);

const eventFeedbackSchema = {
    firstname: String,
    lastname: String,
    email: String,
    feedback: String,
};

const eventRegistration = {
    firstname: String,
    lastname: String,
    email: String,
    mobile: Number,
    gender: String,
    city: String,
    state: String,
};

const EventFeedback = mongoose.model("EventFeedback", eventFeedbackSchema);
const EventRegistration = mongoose.model(
    "EventRegistration",
    eventRegistration
);

app.get("/feedback", function (req, res) {
    res.sendFile(__dirname + "/assets/eventFeedback.html");
});

app.get("/event", function (req, res) {
    res.sendFile(__dirname + "/assets/event.html");
});

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/assets/register.html");
});

app.get("/thankyou", function (req, res) {
    res.sendFile(__dirname + "/assets/thankyou.html");
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/assets/login.html");
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/assets/signup.html");
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/assets/welcome.html");
});

app.post("/feedback", function (req, res) {
    let newEvent = new EventFeedback({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        feedback: req.body.feedback
    });
    newEvent.save();
    res.redirect("/");
});

app.post("/register", function (req, res) {
    let newEvent = new EventRegistration({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state
    });
    newEvent.save();
    res.redirect("/thankyou");
});

app.set('view engine', 'ejs');

const EventsList = mongoose.model('Events', eventFeedbackSchema);

app.get('/admin', function (req, res) {
    EventsList.find({}, function (err, events) {
        res.render('admin', {
            EventsList: events
        });

    })
})

app.listen(3000, function () {
    console.log("Server running");
});


