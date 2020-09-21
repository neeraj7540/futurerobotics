/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('chatBlock', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userBy: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'userBy'
		},
		userTo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'UserTo'
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'comment'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'status'
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
		tableName: 'chat_block',
		timestamps:false
	});
};
