import Ajv from "ajv";

const ajv = new Ajv();

const productSchema = {
  type: "object",
  properties: {
    title: {
      type: "object",
      properties: {
        en: { type: "string", minLength: 1 },
        ar: { type: "string", minLength: 1 },
      },
      required: ["en", "ar"],
    },
    images: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
    price: { type: "number", minimum: 0 },
    quantity: { type: "number", minimum: 0 },
    desc: {
      type: "object",
      properties: {
        en: { type: "string", minLength: 1 },
        ar: { type: "string", minLength: 1 },
      },
      required: ["en", "ar"],
    },
  },
  required: ["title", "images", "price", "quantity", "desc"],
};

export default ajv.compile(productSchema);
