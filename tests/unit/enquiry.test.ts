// @vitest-environment node
import { describe, it, expect, vi } from "vitest";
import {
  processEnquiry,
  keyedHash,
  type DeliveryDependencies,
} from "@/lib/enquiry-service";
const data = {
  name: "Alex Example",
  email: "alex@example.com",
  clinic: "Example Clinic",
  website: "",
  summary: "A new website for our clinic.",
  companyFax: "",
};
const key = "12345678-1234-4234-8234-123456789012";
function dependencies() {
  const deps: DeliveryDependencies = {
    hash: (v) => keyedHash("test-secret", v),
    rateLimit: vi.fn(async () => ({
      success: true,
      reset: Date.now() + 60000,
    })),
    claim: vi.fn(async () => "new" as const),
    markSent: vi.fn(async () => {}),
    send: vi.fn(async () => {}),
    local: false,
  };
  return deps;
}
describe("enquiry delivery", () => {
  it("rejects invalid data and honeypots without calling a provider", async () => {
    const deps = dependencies();
    for (const input of [
      { ...data, email: "wrong" },
      { ...data, companyFax: "spam" },
    ])
      expect((await processEnquiry(input, key, "client", deps)).status).toBe(
        400,
      );
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("rejects invalid idempotency keys", async () =>
    expect(
      (await processEnquiry(data, "bad", "client", dependencies())).status,
    ).toBe(400));
  it("delivers with a stable idempotency key and no raw client identifier in Redis", async () => {
    const deps = dependencies();
    const result = await processEnquiry(data, key, "127.0.0.1", deps);
    expect(result.status).toBe(200);
    expect(deps.send).toHaveBeenCalledWith(data, `enquiry/${key}`);
    expect(deps.rateLimit).toHaveBeenCalledWith(deps.hash("127.0.0.1"));
    expect(deps.markSent).toHaveBeenCalled();
  });
  it("returns an honest error when delivery fails", async () => {
    const deps = dependencies();
    deps.send = vi
      .fn()
      .mockRejectedValue(new Error("provider failure with private detail"));
    const result = await processEnquiry(data, key, "client", deps);
    expect(result.status).toBe(503);
    expect(JSON.stringify(result)).not.toContain("private detail");
    expect(deps.markSent).not.toHaveBeenCalled();
  });
  it("fails closed if rate limiting fails", async () => {
    const deps = dependencies();
    deps.rateLimit = vi.fn().mockRejectedValue(new Error("offline"));
    expect((await processEnquiry(data, key, "client", deps)).status).toBe(503);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("throttles with retry instructions before sending", async () => {
    const deps = dependencies();
    deps.rateLimit = vi.fn(async () => ({
      success: false,
      reset: Date.now() + 60000,
    }));
    const result = await processEnquiry(data, key, "client", deps);
    expect(result.status).toBe(429);
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("does not redeliver completed requests", async () => {
    const deps = dependencies();
    deps.claim = vi.fn(async () => "sent" as const);
    expect((await processEnquiry(data, key, "client", deps)).status).toBe(200);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("rejects a key reused with changed content", async () => {
    const deps = dependencies();
    deps.claim = vi.fn(async () => "conflict" as const);
    expect((await processEnquiry(data, key, "client", deps)).status).toBe(409);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("retries uncertain delivery using the original provider key", async () => {
    const deps = dependencies();
    deps.claim = vi.fn(async () => "same" as const);
    await processEnquiry(data, key, "client", deps);
    expect(deps.send).toHaveBeenCalledWith(data, `enquiry/${key}`);
  });
  it("labels local simulations", async () => {
    const deps = dependencies();
    deps.local = true;
    expect(
      (await processEnquiry(data, key, "client", deps)).body,
    ).toMatchObject({ ok: true, simulated: true });
  });
});
