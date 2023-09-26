import http from "http";

const server = http.createServer((request, response) => {
  return response.end("Hello ignite");
});

server.listen(3333);
