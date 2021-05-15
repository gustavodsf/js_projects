module.exports = {
  dbAddres: process.env.DATABASE || 'mongodb://localhost/bus-dev',
  secret: process.env.SECRET || 'busapiserver',
  port: process.env.PORT || '3000',
  env: process.env.NODE_ENV || 'development',
  empresa: '001',
  test: 'test',
};
