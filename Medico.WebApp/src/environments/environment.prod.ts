// This file is required by angular build and used during "ng build --prod"
// Production environment configuration

export const environment = {
//update the urls once backend is hosted
  production: true,
  JsonServerUrl: 'https://your-production-domain.com',
  ApiServerUrl: 'https://your-production-api.com/api',
  loginAttemptsAllowed: 3
};
