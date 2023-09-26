import http from "node:http";

const server = http.createServer((request, response) => {
  const {method, url} = request;

  if (method === "GET" && url === "/users") {
    return response.end("List users");
  }

  if (method === "POST" && url === "/users") {
    return response.end("Create users");
  }

  return response.end("Hello ignite");
});

server.listen(3333);
