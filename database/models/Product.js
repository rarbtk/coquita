module.exports = function (sequelize, dataTypes) {
  let alias = "Product";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    category_id: {
      type: dataTypes.INTEGER,
    },
    detail: {
      type: dataTypes.STRING,
    },
    image: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
  };
  let Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "Category",
      foreignKey: "category_id",
    });
  };

  return Product;
};
