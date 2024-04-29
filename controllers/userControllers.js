import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { mapGender, userExists } from "../util/userUtil.js";
import validate from "../util/userValidation.js";

export async function signup(req, res) {
  try {
    const { email, gender, password } = req.body;
    // map the gender to the corresponding object
    if (gender) req.body.gender = mapGender(gender);

    // Validate request body
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);

    // Check if user already exists
    const userAlreadyExists = await userExists(email);
    if (userAlreadyExists)
      return res.status(400).send("The user already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update request body with hashed password and lowercased email
    req.body.password = hashedPassword;
    req.body.email = email.toLowerCase();

    await userModel.create(req.body);

    return res.status(200).send({ message: "User is created successfully" });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { email, userId: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "10h",
      }
    );
    return res.status(200).send({ userId: user._id.toString(), token: token });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}

export async function update(req, res) {
  try {
    const { gender } = req.body;
    if (gender) req.body.gender = mapGender(gender);

    if (validate(req.body)) {
      // get param of order req.body.id
      const UserId = req.params.id;
      // check for it in the db if found change the data
      const foundUser = await userModel.findById(UserId);
      if (!foundUser) {
        return res.send(`User not found`);
      }
      //update the new data with the old data
      foundUser.username = req.body.username;
      // Update request body with hashed password and lowercased email
      foundUser.email = req.body.email.toLowerCase();
      const hashedPassword = await bcrypt.hash(foundUser.password, 10);
      foundUser.password = hashedPassword;

      //save to database
      let updatedUser = await foundUser.save();
      // AllOrders = await OrderModel.find();
      return res.json({
        message: `Order ${UserId} updated successfully`,
        data: updatedUser,
      }); // res
    }
    res.send(
      validate.errors[0].instancePath.split("/")[1] +
        " : " +
        validate.errors[0].keyword +
        " ==> " +
        validate.errors[0].message
    );
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}
