require("dotenv").config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "production";
const JWT_SECRET = process.env.JWT_SECRET || "diss_reg_2026_xK9mP2nQ7vL4wR8tY3";

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
