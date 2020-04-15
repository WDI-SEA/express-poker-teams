'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {});
  team.associate = function(models) {
    // A team has many players
    models.team.hasMany(models.player)
  };
  return team;
};