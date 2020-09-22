const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roomlist', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		//	field: 'id'
		},
		
		groupName: {
			type: DataTypes.STRING(110),
			allowNull: true,
			//field: 'socket_id'
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
		tableName: 'roomlist'
	});
};