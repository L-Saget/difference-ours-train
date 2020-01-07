// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    endpoints: {
      Logs: 'http://localhost:8080/getLogs',
      refresh: 'http://localhost:3001/api/auth/refresh'
  }
};

