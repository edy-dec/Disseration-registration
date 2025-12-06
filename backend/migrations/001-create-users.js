import { DataTypes } from "sequelize";

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.ENUM("local", "auth0"),
      defaultValue: "local",
    },
    auth0Id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    userType: {
      type: DataTypes.ENUM("student", "profesor"),
      allowNull: false,
    },
    studentDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    professorDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profileComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  await queryInterface.addIndex("users", ["email"]);
  await queryInterface.addIndex("users", ["userType"]);
  await queryInterface.addIndex("users", ["auth0Id"], {
    unique: true,
    where: {
      auth0Id: {
        [Sequelize.Op.ne]: null,
      },
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("users");
};
