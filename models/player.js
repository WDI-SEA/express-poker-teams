'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    name: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    pic: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  player.associate = function(models) {
    // A player belongs to a team
    models.player.belongsTo(models.team, { 
      onDelete: 'CASCADE' 
    })
  };
  return player;
};