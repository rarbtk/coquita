module.exports = function (sequelize, dataTypes) {
  let alias = "Cart";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
    finished: {
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
    tableName: "carts",
    timestamps: false,
  };

  let cart = sequelize.define(alias, cols, config);

  cart.associate = function (models) {
    cart.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });
  };

  return cart;
};
