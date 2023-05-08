//  Node Code

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("Request is Coming ..... !");
//   console.log(req.method, req.url);

//   if (req.method === "POST") {
//     let body = "";
//     req.on("end", () => {
//         const userName = body.split('=')[1]
//       res.end( `the request is ${userName}`);
//     });

//     req.on('data', (chunk)=>{
//         body += chunk;
//     })
//   } else {
//     res.setHeader('Content-Type' , 'text/html')
//     res.end(
//       '<form method="POST"><input type="text" name="username" /><button>Send</button></form>'
//     );
//   }
// });

// server.listen(4000);

// Express Code

const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res
      .status(error.code || 500)
      .json({ message: error.message || "An Unknown error occured" });
  }
});
app.listen(5000);
