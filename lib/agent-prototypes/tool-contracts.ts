// Provider-neutral contracts for a future model connection. No model API is called.
// Structured tool arguments would be validated on the server before execution.

// showcase:start support-tools
export const supportTools = {
  findKnowledge: {
    description: "Find an approved support article before suggesting steps.",
    inputSchema: { type: "object", additionalProperties: false,
      properties: { topic: { type: "string", enum: ["access", "sync", "unknown"] } },
      required: ["topic"] },
  },
  prepareTicket: {
    description: "Prepare a reviewable ticket draft with source and attempted steps.",
    inputSchema: { type: "object", additionalProperties: false,
      properties: { topic: { type: "string" }, impact: { type: "string", enum: ["person", "team"] },
        alreadyTried: { type: "boolean" } }, required: ["topic", "impact", "alreadyTried"] },
  },
} as const
// showcase:end support-tools

// showcase:start booking-tools
export const bookingTools = {
  checkAvailability: {
    description: "Get valid appointment slots before offering a time.",
    inputSchema: { type: "object", additionalProperties: false,
      properties: { date: { type: "string", format: "date" }, service: { type: "string" } },
      required: ["date", "service"] },
  },
  requestBooking: {
    description: "Validate the selected slot and request an explicitly confirmed booking.",
    inputSchema: { type: "object", additionalProperties: false,
      properties: { slotId: { type: "string" }, confirmed: { type: "boolean", const: true } },
      required: ["slotId", "confirmed"] },
  },
} as const
// showcase:end booking-tools
