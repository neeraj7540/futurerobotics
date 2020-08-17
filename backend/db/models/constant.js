const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('constant', {
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'id'
		},
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		//	field: 'userid'
		},
		user2id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			//field: 'user2id'
		},
		last_msg_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			//field: 'last_msg_id'
		},
		typing: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0',
			//field: 'typing'
		},
		deleted_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		//	field: 'deleted_id'
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
		tableName: 'constant'
	});
};
