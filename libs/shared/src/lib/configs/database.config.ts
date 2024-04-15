export function DatabaseConfig() {
  return {
    database: {
      uri: process.env.URI,
      redis_uri: process.env.REDIS_URL || 'redis://localhost:6379',
    },
  };
}
