var Sequelize = require("sequelize");
var db = require("../config/db");
var User = require("../models/user");
const uuid = require("uuid/v4"); // ES5

var sequelize = new Sequelize(db.url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

var table = "Todos";

// setup User model and its fields.
var Todo = sequelize.define(
  table,
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
		},
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    label: {
      type: Sequelize.STRING,
      allowNull: true
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {}
);

Todo.belongsTo(User, { foreignKey: "userId"});

sequelize.sync()
  .then(() => {
    console.log(`Table ${table} is created if one doesn't exist`);
  })
  .catch(error => console.log("This error occured", error));

// export User model for use in other files
module.exports = Todo;
