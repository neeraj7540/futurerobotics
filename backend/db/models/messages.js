module.exports = function(sequelize, DataTypes) {
	return sequelize.define('messages', {
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
			allowNull: false,
			field: 'receiverId'
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
		tableName: 'messages',
		timestamps:false
	});
};
