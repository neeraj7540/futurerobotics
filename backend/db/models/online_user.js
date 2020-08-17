const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('onlineUser', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		//	field: 'id'
		},
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		//	field: 'userid'
		},
		socket_id: {
			type: DataTypes.STRING(50),
			allowNull: true,
			//field: 'socket_id'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'status'
		},
        createdAt: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: common.timestamp()
          },
          updatedAt: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: common.timestamp()
          }, 
	}, {
		tableName: 'online_user'
	});
};