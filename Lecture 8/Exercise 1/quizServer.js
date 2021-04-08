const http = require("http");
const fs = require("fs");
const url = require("url");

const clientHTML = fs.readFileSync("publicResources/quizClient.html");
const clientJS = fs.readFileSync("publicResources/quizClientScript.js");

let clients = [];

let server = new http.Server();
server.listen(8080);

server.on("request", (request, response) => {

    let pathname = url.parse(request.url).pathname;

    if (pathname === "/") {
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(clientHTML);
    } else if (pathname === "/quizClientScript.js") {
        response.writeHead(200, {
            "Content-Type": "text/javascript"
        }).end(clientJS);
    }

    else if (pathname !== "/quiz" ||
        (request.method !== "GET" && request.method !== "POST")) {
        response.writeHead(404).end();
    }

    else if (request.method === "GET") {
        acceptNewClient(request, response);
    }

    else {
        broadcastNewMessage(request, response);
    }
});

function acceptNewClient(request, response) {

    clients.push(response);

    request.connection.on("end", () => {
        clients.splice(clients.indexOf(response), 1);
        response.end();
    });

    response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache"
    });
    response.write("event: quiz\ndata: Connected\n\n");

}

async function broadcastNewMessage(request, response) {

    request.setEncoding("utf8");
    let body = "";
    for await (let chunk of request) {
        body += chunk;
    }

    response.writeHead(200).end();

    let message = "data: " + body.replace("\n", "\ndata: ");

    let event = `event: quiz\n${message}\n\n`;

    clients.forEach(client => client.write(event));
}
