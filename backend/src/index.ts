import "reflect-metadata";
import db from "./db";
import express from "express";
import schema from "./schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/countriesResolver";
import env from "./env";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const port = 4000;

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.listen(port, async () => {
//   await db.initialize();
//   console.log(`Checkpoint Backend Aurélie app listening on port ${port}`);
// });

schema.then(async (schema) => {
  await db.initialize();
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`graphql server listening on http://localhost:${port}/}`);
});

// buildSchema({
//   resolvers: [CountriesResolver],
// }).then((schema) => {
//   const server = new ApolloServer({ schema });
//   startStandaloneServer(server, {
//     listen: { port: 4000 },
//   }).then(({ url }) => console.log(`graphql server listening on ${url}`));
// });
