import { Hono } from "hono";
import { logger } from "hono/logger";
import { webhookRouter } from "./routes/webhook";

const app = new Hono();

app.use("*", logger());

app.get("/health", (c) => {
	return c.json({ status: "healthy" });
});

app.route("/webhook", webhookRouter);

export default {
	port: process.env.PORT || 3000,
	fetch: app.fetch,
};
