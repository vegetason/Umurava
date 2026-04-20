import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { Application, Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "API documentation for your Node.js project"
    },
    servers: [
      {
        url: "http://localhost:3004/",
        description: "Local development server"
      }
    ]
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),       // if swagger.ts is in src/config/
    path.join(__dirname, "../../src/routes/*.ts"), // if running from dist/
    path.join(process.cwd(), "src/routes/*.ts"),   // relative to project root ✅ most reliable
  ]
};

const swaggerSpec = swaggerJSDoc(options);

console.log("Swagger spec paths:", Object.keys((swaggerSpec as any).paths || {}));

export const setupSwagger = (app: Application): void => {
  const swaggerUi = require("swagger-ui-express");

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/docs-json",
    }
  }));

  app.get("/docs-json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};