module.exports = function (sequelize, dataTypes) {
  let alias = "Category";

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
    tableName: "Categories",
    timestamps: false,
  };
  let Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "Product",
      foreignKey: "category_id",
    });
  };

  return Category;
};
