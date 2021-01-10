module.exports = function (sequelize, dataTypes) {
  let alias = "Carts";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
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
    tableName: "carts",
    timestamps: false,
  };

  let carts = sequelize.define(alias, cols, config);

  carts.associate = function (models) {
    carts.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });
  };

  return carts;
};
