const express = require('express');
const app = express();
const path = require('path');
const fileDir = path.join(__dirname, '/build');
app.use(express.static(fileDir));
app.get('/*', function (request, response) {
  try {
    const mainFile = path.join(__dirname, '/build/index.html');
    response.sendFile(mainFile);
  } catch (error) {
    response.sendStatus(500);
  }
});
app.listen(3000, () => console.log('listening on port'));
