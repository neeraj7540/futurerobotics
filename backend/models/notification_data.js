/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notificationData', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		senderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'sender_id'
		},
		receiverId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'receiver_id'
		},
		senderName: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'senderName'
		},
		senderImage: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'senderImage'
		},
		notification: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'notification'
		},
		createdAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'updatedAt'
		},
		status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: true,
			defaultValue: '1',
			field: 'status'
		},
		isRead: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isRead'
		}
	}, {
		tableName: 'notification_data'
	});
};
