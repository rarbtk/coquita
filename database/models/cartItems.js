module.exports = function (sequelize, dataTypes) {
  let alias = "CartItems";

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
<<<<<<< HEAD
=======
    createdAt: {
      type: dataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
    updatedAt: {
      type: dataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
>>>>>>> f3537e59f5e6fc1282c2e53898bb8e145e9057ef
  };
  let config = {
    tableName: "cart_items",
    timestamps: false,
  };

  let CartItems = sequelize.define(alias, cols, config);

  CartItems.associate = function (models) {
    CartItems.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
    });
    CartItems.belongsTo(models.Carts, {
      as: "Carts",
      foreignKey: "cart_id",
    });
  };

  return CartItems;
};
