/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notificationData', {
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
			field: 'sender_id'
		},
		receiverId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'receiver_id'
		},
		senderName: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			field: 'senderName'
		},
		senderImage: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			field: 'senderImage'
		},
		notification: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			field: 'notification'
		},
		createdAt: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'updatedAt'
		},
		status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: '1',
			field: 'status'
		},
		isRead: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'isRead'
		}
	}, {
		tableName: 'notification_data'
	});
};
