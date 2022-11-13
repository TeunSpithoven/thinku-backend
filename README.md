# thinku-backend
status: https://docs.nestjs.com/techniques/database at typeorm integration

backend application for the thinku quiz application providing rest and realtime functionalities
front-end: https://github.com/TeunSpithoven/thinku-frontend

to run a dev server:
download the project files or clone this repository
```
git clone https://github.com/TeunSpithoven/thinku-backend.git
```
install dependencies
```
npm install
```
run the development server
```
npm run start:dev
```

##Production
disable the synchronize option in the TypeOrm configuration in app.module.ts 
