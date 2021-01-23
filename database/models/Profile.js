module.exports = function (sequelize, dataTypes) {
  let alias = "Profile";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
    tableName: "profiles",
    timestamps: false,
  };
  let Profile = sequelize.define(alias, cols, config);

  Profile.associate = function (models) {
    Profile.hasMany(models.User, {
      as: "User",
      foreignKey: "profile_id",
    });
  };

  return Profile;
};
