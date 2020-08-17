const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('blockedUser', {
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'id'
		},
		id: { 
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'userid'
		},
		userby: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'userby'
		},
		userto: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'userto'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
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
		tableName: 'blocked_user'
	});
};





