# Running locally
- Make sure you have postgres installed and running
- Modify `./server/config/config.json` as appropriate to connect to the postgres process
- Install `sequelize` cli and run `sequelize db:migrate` in the project root directory
- Populate `./server/config/secrets.js` with 
```
module.exports = {  
  jwtSecret: <fillthisin>
};
```
- Start server with `npm run start:dev`. Api is defined in `./server/routes/index.js`
