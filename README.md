# Lotte Mall Kiosks 



## Getting started

Develop Kiosk management system and machine for Lotte mall _ Tay Ho branch in Vietnam.

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git clone https://gitlab.com/dabeeovina/lotte-mall-kiosks.git
```

## Setting backend
- duplicate .env.sample file to .env file
- change the .env file content
- run command line:
```
cd backend
yarn or npm install
yarn start:dev or npm run start:dev
```
- Framework: Nestjs (https://docs.nestjs.com/cli/overview)
  - install nest cli firstly: `npm install -g @nestjs/cli`
  - view all nest commands: `nest --help`

## Swagger Api
- go to http://localhost:PORT/swagger to view swagger api information. PORT is defined in .env file
- view swagger json file via url http://localhost:PORT/swagger-json

- Framework: Nestjs (https://docs.nestjs.com/cli/overview)
  - install nest cli firstly: `npm install -g @nestjs/cli`
  - view all nest commands: `nest --help`

- Migrate database: go to 'config/db-config.ts' change value of synchronize to true. After completing migration database, please change value of synchronize to false