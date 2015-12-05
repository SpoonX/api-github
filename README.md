# ApiGithub
Sane, and simple wrapper for the github API.

## Usage
```javascript
var ApiGithub = require('api-github'),
    api       = new ApiGithub({});

api.users.find('RWOverdijk').then(console.log).catch(console.error);
api.orgs.find('SpoonX').then(console.log).catch(console.error);
api.repos.find('spoonx/aurelia-orm').then(console.log).catch(console.error);

```
