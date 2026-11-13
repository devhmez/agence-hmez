// @vitest-environment node
import { afterEach, describe, it, expect, vi } from "vitest";
import { POST } from "@/app/api/enquiry/route";
afterEach(() => vi.unstubAllEnvs());
function request(body: string, headers: Record<string, string> = {}) {
  return new Request("https://forma.example/api/enquiry", {
    method: "POST",
    headers: {
      origin: "https://forma.example",
      "content-type": "application/json",
      ...headers,
    },
    body,
  });
}
describe("endpoint boundaries", () => {
  it("accepts the public host when Next normalizes the internal hostname", async () => {
    vi.stubEnv("MAIL_MODE", "");
    const req = new Request("http://localhost:3000/api/enquiry", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3000",
        origin: "http://127.0.0.1:3000",
        "content-type": "application/json",
      },
      body: "{}",
    });
    expect((await POST(req)).status).toBe(503);
  });
  it("rejects cross-origin requests", async () =>
    expect(
      (await POST(request("{}", { origin: "https://other.example" }))).status,
    ).toBe(403));
  it("rejects unsupported types and malformed JSON", async () => {
    expect(
      (await POST(request("a=b", { "content-type": "text/plain" }))).status,
    ).toBe(415);
    expect((await POST(request("{"))).status).toBe(400);
  });
  it("enforces actual streamed bytes, not only the content-length header", async () =>
    expect(
      (await POST(request(JSON.stringify({ x: "a".repeat(12001) })))).status,
    ).toBe(413));
  it("never enables local simulation in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("MAIL_MODE", "local");
    expect((await POST(request("{}"))).status).toBe(503);
  });
  it("fails closed without live credentials", async () => {
    vi.stubEnv("MAIL_MODE", "resend");
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await POST(request("{}"))).status).toBe(503);
  });
});
