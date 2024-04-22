import Ajv from "ajv";

const ajv = new Ajv();

const orderSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    products: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
    totalPrice: { type: "number", minimum: 0 },
    date: { type: "string"},
    status: {
      type: "object",
      properties: {
        ar: { type: "string", enum: ["معلق", "مقيول", "مرفوض"] },
        en: { type: "string", enum: ["pending", "accepted", "rejected"] },
      },
      required: ["ar", "en"],
    },
  },
  required: ["userId", "products", "totalPrice", "status"],
};

export default ajv.compile(orderSchema);
