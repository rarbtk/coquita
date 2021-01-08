module.exports = function (sequelize, dataTypes){
    let alias = "cart_items";
    
    let cols ={

        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },

          product_id : {
            type: dataTypes.INTEGER,
            
          },

        quantity: {
            type: dataTypes.INTEGER,
            
          },
        
        cart_id : {
            type: dataTypes.INTEGER,
            
          },
    };
    let config = {
        tableName = "cart_items",
        timestamps = false
    };
    
    let cart_items = sequelize.define(alias,cols,config);

    cart_items.associate = function (models) {
      cart_items.belongsTo(models.Product, {
        as: "Product",
        foreignKey: "product_id",
      });
      cart_items.belongsTo(models.carts,{
        as: "carts",
        foreignKey: "cart_id",
      })
    };

    return cart_items;


}