import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/node";


import fetch, { Headers, Request, Response } from "node-fetch";

// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.Headers = Headers;
// @ts-ignore
globalThis.Request = Request;
// @ts-ignore
globalThis.Response = Response;


configure({ testIdAttribute: "data-e2e" });

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

globalThis.BASE_URL = 'http://localhost:3000';