export function DatabaseConfig() {
  return {
    database: {
      uri: process.env.URI,
      redis_host: process.env.REDIS_HOST,
      redis_port: process.env.REDIS_PORT,
      redis_password: process.env.REDIS_PASSWORD,
    },
  };
}
