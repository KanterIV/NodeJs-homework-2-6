const {
  HttpError,
  ctrlWrapper,
  sendEmail,
  verifyEmailMessage,
} = require("./../helpers");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { SECRET_KEY, FRONTEND_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail(verifyEmailMessage(email, verificationToken));

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect(`${FRONTEND_URL}/login`);
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyToken = user.verificationToken;
  await sendEmail(verifyEmailMessage(email, verifyToken));

  res.status(200).json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Your e-mail is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      name: user.name,
      avatar: user.avatarURL,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name, avatarURL, subscription } = await req.user;

  res.json({ email, name, avatarURL, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw HttpError(400, "Invalid subscription");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const filedata = req.file;
  if (!filedata) {
    throw HttpError(400, "File upload error");
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  await image.contain(250, 250);
  await image.writeAsync(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
