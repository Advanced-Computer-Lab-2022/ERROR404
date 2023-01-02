# Online Learning Website

The goal of the project is to build a full online learning 
system. An online learning system is a website where people 
can take courses that have already been recorded. The Scrum 
Agile Methodology was used to create this project using the 
MERN stack (MongoDB, Express JS, React JS, and Node JS). We 
used Java Script as our main language, so throw it all away. 
This project was easy and simple to do.


## Table of contents 
* [Technologies](#technologies)
* [Environment Variables](#environmentVariables)
* [Run Locally Installation](#runLocallyInstallation)
* [API Reference](#APIreference)
* [Our Roadmap](#ourRoadmap)
* [Feedback](#feedback)
* [Authors](#authors)
## Technologies
![MongoDB](https://img.shields.io/badge/MongoDB%20-%2347A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white) 

![React](https://img.shields.io/badge/React%20-%2361DAFB.svg?&style=for-the-badge&logo=React&logoColor=white)

![MongoDB](https://img.shields.io/badge/Express%20-%23000000.svg?&style=for-the-badge&logo=Express&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js%20-%23339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)

![html](https://img.shields.io/badge/HTML5%20-%23E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white)

![css](https://img.shields.io/badge/CSS3%20-%231572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white)

![json](https://img.shields.io/badge/JSON%20-%23000000.svg?&style=for-the-badge&logo=JSON&logoColor=white)

## Our Roadmap

- Additional browser support

- Add more integrations


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`Add your Mongo database url at MongoURI=`

`Add your Port at Port= `



## Run Locally Installation

Install the used libraries for the backEnd

```bash
  cd backend
  then
  npm install
```

Install the used libraries for the frontEnd

```bash
  cd frontend
  then
  npm install
```
To run the backEnd
```bash
  node backend/main.js
```
To run the frontEnd
```bash
  cd frontend/myapp 
  then
  npm start
```

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Feedback

If you have any feedback, please reach out to us at 
[Our linkedin page](https://www.linkedin.com/company/thestartupcompany)
or email us via [gmail](https://mail.google.com/mail/u/0/?fs=1&to=theStartupCompany@gmail.com&su=ContactUs&tf=cm)

## Authors
- [@Ali Ghieth](https://www.github.com/alighieth)
- [@Abdelrahman Ali](https://www.github.com/AbdelrahmanAli12)

