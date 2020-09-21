/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('chatConstants', {
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
		lastMessageId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'lastMessageId'
		},
		deletedId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'deletedId'
		},
		receiverUnreadCount :{
				type: DataTypes.INTEGER(11),
				defaultValue:0
			
		}
        , 
		senderUnreadCount :{
			type: DataTypes.INTEGER(11),
			defaultValue:0
	    }
     ,
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
		tableName: 'chat_constants',
		timestamps:false
	});
};
