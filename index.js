//FrameWorks
const express = require("express");
const { dirname } = require("path/posix");
const server = express();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("MyHost 1.0 - Your own PaaS cloud service")
  console.log("developed by @markyndev")
  console.log("")
  readline.question('Enter the IP you will use: ', input_ip => {
    readline.question('Enter the PORT you will use: ', input_port => {
        console.log("# If it's your first time using it, put your web files in the ./public folder")
       server.listen(input_port, input_ip);
       server.use(express.static('./public'));

        console.log(`Server is running on: http://${input_ip}:${input_port}`)
    });
});

// Rotas

//const port = 3000;
//server.listen(process.env.PORT || port, () => console.log(`Running http://localhost:${port}`));
