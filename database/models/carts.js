module.exports = function (sequelize, dataTypes) {
  let alias = "Carts";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
<<<<<<< HEAD
  };

    let config = {
        tableName : "carts",
        timestamps : false,
    }
=======
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
>>>>>>> f3537e59f5e6fc1282c2e53898bb8e145e9057ef

  let carts = sequelize.define(alias, cols, config);

  carts.associate = function (models) {
    carts.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });
  };

  return carts;
};
