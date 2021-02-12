module.exports = function (sequelize, dataTypes) {
  let alias = "CartItem";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: dataTypes.INTEGER,
    },

    quantity: {
      type: dataTypes.INTEGER,
    },
    cart_id: {
      type: dataTypes.INTEGER,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    subTotal: {
      type: dataTypes.DECIMAL,
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
    tableName: "cart_items",
    timestamps: true,
  };

  let CartItem = sequelize.define(alias, cols, config);

  return CartItem;
};
