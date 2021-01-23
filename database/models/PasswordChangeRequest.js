module.exports = function (sequelize, dataTypes) {
  let alias = "PasswordChangeRequest";

  let cols = {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
    },
    hash: {
      type: dataTypes.STRING,
    },
    user_id: {
      type: dataTypes.STRING,
    },
    valid: {
      type: dataTypes.STRING,
    },
    createdAt: {
      type: dataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
    updatedAt: {
      type: dataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  };

  let config = {
    tableName: "password_change_requests",
    timestamps: true,
  };
  let PasswordChangeRequests = sequelize.define(alias, cols, config);

  PasswordChangeRequests.associate = function (models) {
    // PasswordChangeRequests.hasMany(models.User, {
    //   as: "User",
    //   foreignKey: "user_id",
    // });
  };

  return PasswordChangeRequests;
};
