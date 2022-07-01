module.exports = {
  type: 'mysql',
  url: process.env.FREE_PLACE_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/common/infrastructure/migrations',
  },
};

function getEntityDirectory() {
  const path = 'dist/src/**/infrastructure/entities/*.js';
  return path;
}

function getMigrationDirectory() {
  const path =
    'dist/src/common/infrastructure/migrations/*.js';
  return path;
}
