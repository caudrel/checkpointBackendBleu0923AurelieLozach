import "reflect-metadata";
import db from "./db";
import express from "express";
import schema from "./schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/countriesResolver";
import dotenv from "dotenv";
dotenv.config();

const app = express();

db.initialize();

buildSchema({
  resolvers: [CountriesResolver],
}).then((schema) => {
  const server = new ApolloServer({ schema });
  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => console.log(`graphql server listening on ${url}`));
});
