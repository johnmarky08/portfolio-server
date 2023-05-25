const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || process.env.port || 8080;
const helmet = require("helmet");
const app = express();
const userRoute = require("./routes/users.js");

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "script-src": [
        "'self'",
        "https: data:",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
      "object-src": ["'self'", "* data:", "'unsafe-inline'", "'unsafe-eval'"],
    },
  })
);
app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
app.use(express.json());
app.use(cors());
app.set("json spaces", 2);
app.use("/user", userRoute);

app.get("/", function (req, res) {
  res.status(200).json({
    status: 200,
    message: "Ready To Go!",
  });
});

app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, function (err) {
      if (err) {
        console.error("Failure To Launch Server");
        return;
      }
      console.log(`Listening On Port: ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
