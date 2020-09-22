module.exports = function(sequelize, DataTypes) {
	return sequelize.define('group_messages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		senderId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'senderId'
		},
		receiverId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'receiverId'
        },
        groupId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'groupId'
		},
		chatConstantId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			field: 'chatConstantId'
		},
		// groupId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: false,
		// 	defaultValue: '0',
		// 	field: 'groupId'
		// },
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'message'
		},
		readStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			field: 'readStatus'
		},
		messageType: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'messageType'
		},
		deletedId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0,
			field: 'deletedId'
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'updated'
		}
	}, {
		tableName: 'group_messages',
		timestamps:false
	});
};
