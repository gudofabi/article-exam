import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../../db.json"));
const middlewares = jsonServer.defaults();

// Log request URL before routing
server.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};
