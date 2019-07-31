var Sequelize = require('sequelize');
var db = require('../config/db');
var User = require('../models/user');
const uuid = require('uuid/v4'); // ES5


var sequelize = new Sequelize(db.url, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});


var table = 'Todos';

// setup User model and its fields.
var Todo = sequelize.define(table, {
    todo_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    }
,
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    label:{
        type:Sequelize.STRING,
        allowNull:false
    },
    due_date:{
        type:Sequelize.DATE
    },
}, {
    // hooks: {
    //     beforeCreate: (user) => {
    //         const salt = bcrypt.genSaltSync();
    //         user.password = bcrypt.hashSync(user.password, salt);
    //         user.referral_token = user.name.split(' ')[0] + '_' + randomize('Aa', 4) + randomize('0', 3);
    //     },
    //     beforeUpdate: (user) => {
    //         const salt = bcrypt.genSaltSync();
    //         user.password = bcrypt.hashSync(user.password, salt);
    //     }
    // },
});

Todo.belongsTo(User);


// User.prototype.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }


sequelize.sync()
    .then(() => {
        console.log(`Table ${table} is created if one doesn't exist`)
    })
    .catch(error => console.log('This error occured', error));
// export User model for use in other files.;
module.exports = Todo;
