import Ajv from "ajv";

const ajv = new Ajv();

const orderSchema = {
  type: "object",
  properties: {
    userId: { type: "string", format: "ObjectId" },
    products: {
      type: "array",
      items: { type: "string", format: "ObjectId" },
      minItems: 1,
    },
    totalPrice: { type: "number", minimum: 0 },
    date: { type: "string", format: "date-time" },
    status: {
      type: "object",
      properties: {
        ar: { type: "string", enum: ["معلق", "تم القبول", "تم الرفض"] },
        en: { type: "string", enum: ["pending", "accepted", "rejected"] },
      },
      required: ["ar", "en"],
    },
  },
  required: ["userId", "products", "totalPrice", "status"],
};

export default ajv.compile(orderSchema);
