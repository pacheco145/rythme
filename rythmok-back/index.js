// Express modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require('cors');
const MongoStore = require("connect-mongo");
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();



// const { isAuthenticated } = require('./middlewares/auth.middleware');

//Routes
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

const eventsRoutes = require("./routes/events.routes")

const hallsRoutes = require("./routes/halls.routes");
const artistsRoutes = require("./routes/artists.routes");
const stylesRoutes = require("./routes/styles.routes");
const usersRoutes = require("./routes/users.routes");




//Save into db constant connections elements from db.js
const db = require("./db.js");

// When a directory is set, the script will try to run an index.js whithin that folder by default
require("./authentication");

const PORT = process.env.PORT || 5000;


// DB connection 
db.connect();


// Our express server
const server = express();


// CORS 
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
}
server.use(cors(corsOptions));


// Bootstrap here


server.use(
    session({
        // secret: process.env.SESSION_SECRET,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 36000000,
            httpOnly: false,
            secure: false,
            sameSite: false,
        },
        store: MongoStore.create({ mongoUrl: db.DB_URL }),
    })
);
// next()


//Start passport
server.use(passport.initialize());
// next
server.use(passport.session()); //This middleware adds the users sessions. It add req.user into the request object
// next


// View engine is configured here
// Fot this project no need of templates

//Static files like uploads, common styles, etc
server.use(express.static(path.join(__dirname, 'public')));

// With these two lines we are able to parse JSON from body and avoid error "Cannot destructure property 'name' of 'req.body' as it is undefined."
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", indexRoutes);
server.use("/auth", authRoutes);

server.use("/events", eventsRoutes);
server.use("/artists", artistsRoutes);
server.use("/styles", stylesRoutes);
server.use("/users", usersRoutes);
server.use("/halls",hallsRoutes);



//Middleware when no url is found.
server.use("*", (req, res) => {
    const error = new Error("Route not found");
    error.status = 404;
    return res.status(404).json(error.message);
});

// The previous error is retrieved and handled by the next function
server.use((error, req, res, next) => {
    console.log("Error Handler", error);
    const errorStatus = error.status || 500;
    const errorMsg = error.message || "Unexpected Error";
    // return res.render('error-view', { status: errorStatus, message: errorMsg });
    console.log(errorMsg);
    return res.json( { status: errorStatus, message: errorMsg })

});

server.listen(PORT, () => {
    console.log(`Server running at full throttle in http://localhost:${PORT}`);
});