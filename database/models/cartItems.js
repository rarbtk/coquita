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

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
    });
    CartItem.belongsTo(models.Cart, {
      as: "Cart",
      foreignKey: "cart_id",
    });
  };

  return CartItem;
};
