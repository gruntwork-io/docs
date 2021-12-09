# Create a Basic App

For the purposes of this guide we will create a basic [Node.js](https://nodejs.org) app that responds to requests on
port `8080`.

Create a file called `server.js` and paste in the following source code:

**server.js**

``` javascript
const express = require("express");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

Next, create a `package.json` that defines your dependencies:

**package.json**

``` json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.4"
  }
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"be776541cbdff34cde435123753ea5b2"}
##DOCS-SOURCER-END -->
