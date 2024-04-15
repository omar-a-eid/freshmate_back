import Ajv from "ajv";

const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 50 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    gender: {
      type: "object",
      properties: {
        ar: { type: "string", enum: ["ذكر", "انثى"] },
        en: { type: "string", enum: ["male", "female"] },
      },
      required: ["ar", "en"],
    },
    admin: { type: "boolean" },
  },
  required: ["username", "email", "password", "gender"],
};

export default ajv.compile(userSchema);
