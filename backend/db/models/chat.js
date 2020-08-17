const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('chat', {
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
		user2id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'user2id'
		},
		constantid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			//field: 'constantid'
		},
		message: {
			type: DataTypes.STRING(255),
			allowNull: false,
			//field: 'message'
		},
		msg_type: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			//field: 'msg_type'
		},
		deleted_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			//field: 'deleted_id'
		},
		read_status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			//field: 'read_status'
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
		tableName: 'chat'
	});
};






