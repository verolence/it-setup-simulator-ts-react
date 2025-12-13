import { createProxyMiddleware } from "http-proxy-middleware";
import type { RequestHandler } from "express";

export const proxy: RequestHandler = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true
});
