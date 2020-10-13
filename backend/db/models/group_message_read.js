
const common = require('../../helpers/common');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('group_message_read', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: "id"
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: "userId",
			defaultValue: 0
		},
		groupId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: "groupId",
			defaultValue: 0
		},
		lastReadId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: "lastReadId",
			defaultValue: 0
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
		tableName: 'group_message_read',
		timestamps: true
	});
};



