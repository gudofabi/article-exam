import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json")); // Updated path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req, res) => {
  console.log(`Request URL: ${req.url}`);
  server(req, res);
};
