// This file is required by angular build and used during "ng build --prod"
// Production environment configuration

export const environment = {
//update the urls once backend is hosted
  production: true,
  JsonServerUrl: 'https://your-production-domain.com',
  ApiServerUrl: 'https://medico-web-api-app-service-hbesa4hycte2cwdz.centralus-01.azurewebsites.net/api',
  loginAttemptsAllowed: 3
};
