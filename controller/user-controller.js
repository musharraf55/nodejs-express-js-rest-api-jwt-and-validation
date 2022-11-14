import User from "../model/user.js";
import validate from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const { is_deleted } = req.body;
    const result = await User.find({ is_deleted });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Record is Empty" });
    }

    res.status(200).json({
      msg: "All Records Are Here",
      data: result,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Routes (get)",
      error: err,
    });
  }
};

// Save data of the user in database
export const addUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { name, email, password } = req.body;
    let existUser = await User.findOne({ email: email });
    if (existUser)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
    const hashPassword = await bcrypt.hash(password, salt);
    const insertUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    const result = await insertUser.save();
    console.log(result);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY
    );

    if (!result) {
      res.status(500).json({ success: false, message: "Not Inserted" });
    }
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    res.status(400).json({ Message: "Server Error", error: error });
  }
};
// user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUsers = await userModel.findOne({ email: email });
    if (!existUsers) {
      res.status(404).json({ Message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existUsers.password);
    if (!matchPassword) {
      res.status(404).json({ Message: "Invalid Credentials" });
    }

    //   if (!user.verified) {
    // 		let token = await Token.findOne({ userId: user._id });
    // 		if (!token) {
    // 			token = await new Token({
    // 				userId: user._id,
    // 				token: crypto.randomBytes(32).toString("hex"),
    // 			}).save();
    // 			const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    // 			await sendEmail(user.email, "Verify Email", url);
    // 		}

    // 		return res
    // 			.status(400)
    // 			.send({ message: "An Email sent to your account please verify" });
    // 	}

    // 	const token = user.generateAuthToken();
    // 	res.status(200).send({ data: token, message: "logged in successfully" });
    // } catch (error) {
    // 	res.status(500).send({ message: "Internal Server Error" });
    // }

    const token = jwt.sign(
      {
        email: existUsers.email,
        id: existUsers._id,
        token: crypto.randomBytes(32).toString("hex"),
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ user: existUsers, token: token });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
};

// Get a user by id
export const getUserById = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited user in the database
export const editUser = async (request, response) => {
  let user = request.body;

  const editUser = new User(user);
  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// deleting data of user from the database
export const deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
