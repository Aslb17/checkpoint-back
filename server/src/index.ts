import "reflect-metadata";
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import db from "./db";
import { env } from "./env";
import CountryResolver from "./resolvers/CountryResolver";

const start = async (): Promise<void> => {
  await db.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req, res }) => {
      return { req, res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
    )
  );
};

start().catch(console.error);
