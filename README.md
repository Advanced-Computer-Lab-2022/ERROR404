
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
* [Environment Variables](#environment-variables)
* [Features](#features)
* [Run Locally Installation](#run-locally-installation)
* [Code Examples](#code-examples)
* [API Reference](#api-reference)
* [Feedback](#feedback)
* [Authors](#authors)
## Technologies
![MongoDB](https://img.shields.io/badge/MongoDB%20-%2347A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white)

![React](	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![MongoDB](https://img.shields.io/badge/Express%20-%23000000.svg?&style=for-the-badge&logo=Express&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js%20-%23339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)

![html](https://img.shields.io/badge/HTML5%20-%23E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white)

![css](https://img.shields.io/badge/CSS3%20-%231572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white)

![json](https://img.shields.io/badge/JSON%20-%23000000.svg?&style=for-the-badge&logo=JSON&logoColor=white)

![antDesign](https://img.shields.io/badge/Ant_Design%20-%230170FE.svg?&style=for-the-badge&logo=Ant%20Design&logoColor=white)

![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Website Snippets

#### Homepage
<img src="/Images/Capture2.PNG" alt="Alt text">

#### user login
<img src="/Images/Capture4.PNG" alt="Alt text">

#### Admin dashboard
<img src="/Images/Capture.PNG" alt="Alt text">

#### Reports
<img src="/Images/Capture1.PNG" alt="Alt text">

#### View all courses
<img src="/Images/Capture3.PNG" alt="Alt text">

#### Forget Password
<img src="/Images/Capture5.PNG" alt="Alt text">

#### Instructor balance
<img src="/Images/Capture6.PNG" alt="Alt text">

#### Create Course
<img src="/Images/Capture7.PNG" alt="Alt text">

## Features

### Our Webstie User Types

#### Admin ,Instructor ,Individual Trainee ,Corporate Trainee and Guest

### Admin's Features
#### As an admin you can

* view reported problems and mark them as "resolved" or "pending"
* refund an amount to a trainee to their wallet
* add another administrator with a set username and password
* add instructors and create their usernames and passwords
* add corporate trainees and create their usernames and passwords
* view course requests from corporate trainees and grant their access 
   to specific courses
* set a promotion (% sale) for specific courses, several courses or all courses

### Instructor's Features
#### As an instructor you can

* log in using a username and password and log out
* view and accept the website/ company refund/ payment policy while signing up
* view all the titles of the courses given by you
* filter the courses given by you based on a subject or price
* search for a course given by you based on course title or subject
* view the ratings and reviews on all your courses
* view the amount of money owed per month
* view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per registered trainee
* create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course
* upload a video link from YouTube under each subtitle and enter a short description of the video
* upload a video link from YouTube as a preview to the course
* create a multiple choice exam with 4 choices per question
* set the answers (not visible for the trainee) for multiple choice exercises
* view your rating and reviews
* edit your mini biography or email
* define a promotion for the course (% discount) and for how long

### Individual trainee's Features
#### As an individual trainee you can

* log in using a username and password and long out
* view and accept the website/ company refund/ payment policy while signing up
* enter your credit card details to pay for a course they want to register for
* pay for a courses
* view the amount available in your wallet from refunded courses
* request a refund only if less than 50% of the course has been attended

### Corporate trainee's Features
#### As an corporate trainee you can 

* request access to a specific course you do not have access to

### Guest trainee's Features
#### As an guest trainee you can 

* sign up for an account as an individual trainee using a username, email, password, first name, last name and gender
* view and accept the website/ company refund/ payment policy while signing up

### Individual and Corporate trainees' Features 
#### As an individual or corporate trainee you can 

* open all the items inside a course you are registered for including videos and excercises
* rate an instructor or a course
* solve a multiple choice exercise by choosing the correct answer
* submit the answers to the exercise after completing it
* view your grade from the exercise
* view the questions with the correct solution to view the incorrect answers
* watch a video from a course you are registered for
* see your progress in the course as a percentage of how much of the course has been completed so far
* receive a certificate as a PDF after completing the course via email and download it
* write notes while watching the video and download it
* see a list of all the courses you are enrolled in on your profile

### Instructor ,Individual and Corporate trainees' Features 
#### As an Instructor, individual or corporate trainee you can 

* change your password
* receive an email to change a forgotten password
* report a problem with a course. The problem can be "technical", "financial" or "other"
* see all previously repoted problems and their statuses
* follow up on an unresolved problem

### Guest,Instructor,Individual and Corporate trainees' Features
#### As a guest,instructor,individual or corporate traiee you can

* select your country 
* view all the titles of the courses available including the total hours of the course and course rating
* view the price of each course
* view the most viewed/ most popular courses
* filter the courses based on a subject and/or rating and choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected
* search for a course based on course title or subject or instructor
## Code Examples 🐱‍💻

### Email sending
```javascript
emailjs
    .send(
        "service_5di6lsf",
        "template_mo9m7xe",
        data,
        "hIXXOv4x76p3JXKWU"
        )
        .then(
            (result) =>
            message.success("An Email has been sent successfully!! ", 1),
            (error) => {
            message.error("Oops... " + error.response.data);
            console.log(JSON.stringify(error));
            }
        );
```
### Layout

```html
 <Layout className="layout">
      <MainHeader values={[isModalOpen, setIsModalOpen]} />
      <Layout
        style={{ minHeight: "90vh", backgroundColor: "white" }}
        theme="dark"
      >
        <Content
          style={{
            margin: "0 0px",
            padding: "5%",
            minHeight: "200vh",
          }}
        >
          {children}
        </Content>
      </Layout>
      <Footer style={{ padding: 0, textAlign: "center", margin: "0 0px" }}>
        <FooterWrapper />
      </Footer>
    </Layout>
```
### Breadcrumb Example
```html
   <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
          </Breadcrumb>
          
```
```html
  <Button
        type="link"
        style={{
          width: "200px",
        }}
        onClick={showModal}
      >
        Take Notes <EditOutlined />
      </Button>
      <Drawer
        title="Taking Note.."
        placement="left"
        width="25vw"
        onClose={handleCancel}
        open={isModalOpen}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={downloadTxtFile}>
              save
            </Button>
          </Space>
        }
      >
        <Form style={{ width: "100%", height: "100%" }}>
          <Form.Item
            style={{
              height: "50vh",
            }}
          >
            <Input.TextArea id="input" placeholder="Type here........" />
          </Form.Item>
        </Form>
      </Drawer>
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`Add your Mongo database url at mongoURI=`

`Add your backend server Port at backendPort= `

`Add your frontend server Port at frontendPort= `



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

#### Get all Reports

```http
  GET /getAllReports
```

#### Get user information

```http
  GET /getUser/:username/:userType
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :---------------------------------------|
| `username`| `string` | **Required**. username of user to fetch |
| `userType`| `string` | **Required**. usertype of user to fetch |

#### Get top courses

```http
  GET /getTopCourses
```

 #### Get user quizzes grades

```http
  GET /getmygrade/:id/:usertype
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :---------------------------------------|
| `id`      | `string` | **Required**. the id of user to fetch   |
| `userType`| `string` | **Required**. usertype of user to fetch |

#### Get the result of a search

```http
  GET /search/:key
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `key`     | `string` | **Required**. key like title or subject to fetch |

#### Get the prices of all the courses

```http
  GET /coursePrice
```

#### Get the result of an instructor searches 

```http
  GET /searchmycourses/:user/:key
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `user`    | `string` | **Required**. Instructor's username to fetch     |
| `key`     | `string` | **Required**. key like title or subject to fetch |


#### Get individual or corporate trainee's courses

```http
  GET /getMyCourses/:usertype/:username
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `usertype`| `string` | **Required**. trainee usertype                   |
| `username`| `string` | **Required**. trainee username                   |


#### Get all the courses

```http
  GET /viewCourses
```

#### Get the result of a search

```http
  GET /getCourse/:id
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `id`      | `string` | **Required**. course's id to fetch               |

#### Get instructor's courses

```http
  GET /instViewCourses/:userId
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `userId`  | `string` | **Required**. instructor's id to fetch           |

#### Get the filtered courses

```http
  GET /filter/:filterType/:key
```

| Parameter   | Type     | Description                                               |
| :---------- | :------- | :---------------------------------------------------------|
| `filterType`| `string` | **Required**. filter type like title or subject to fetch  |
| `key`       | `string` | **Required**. search info to fetch                        |


#### Get instructor's rate and reviews

```http
  GET /viewReviewAndRating/:username
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `username`| `string` | **Required**. instructor's username to fetch     |

#### Get corporate trainee's requests

```http
  GET /getAllRequests
```

#### Get filtered courses based on price or rate

```http
  GET /filterByPriceOrRate/:type/:min/:max
```

| Parameter| Type    | Description                                      |
| :--------| :-------| :------------------------------------------------|
| `type`   | `string`| **Required**. rate or price to fetch             |
| `min`    | `number`| **Required**. min rate or price to fetch         |
| `max`    | `number`| **Required**. max rate or price to fetch         |


#### Get filtered courses based on category

```http
  GET /filterByCategory/:category
```

| Parameter| Type    | Description                                      |
| :--------| :-------| :------------------------------------------------|
|`category`| `string`| **Required**. course category to fetch           |

#### Get all courses' catrgories

```http
  GET /getCategory
```

#### Get individual trainee balance 

```http
  GET /getMyBalance/:username
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :---------------------------------------------------|
| `username`| `string` | **Required**. individual trainee's username to fetch|

#### Get course subtitles

```http
  GET /getAllSubtitles/:id
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :------------------------------------------------|
| `id`      | `string` | **Required**. course id to fetch                 |

#### Get instructor's filtered courses based on price or rate

```http
  GET /instructorfilterByPriceOrRate/:username/:type/:min/:max
```

| Parameter | Type    | Description                                      |
| :-------- | :-------| :------------------------------------------------|
| `username`| `string`| **Required**. instructor's username to fetch     |
| `type`    | `string`| **Required**. rate or price to fetch             |
| `min`     | `number`| **Required**. min rate or price to fetch         |
| `max`     | `number`| **Required**. max rate or price to fetch         |


#### Get instructor's filtered courses based on category

```http
  GET /instructorFilterByCategory/:username/:category
```

| Parameter | Type    | Description                                      |
| :-------- | :-------| :------------------------------------------------|
| `username`| `string`| **Required**. instructor's username to fetch     |
|`category` | `string`| **Required**. course category to fetch           |


#### Get instructor's filtered courses

```http
  GET /instructorFilterCourses/:username/:filterType/:key
```

| Parameter   | Type     | Description                                               |
| :---------- | :------- | :---------------------------------------------------------|
| `username`  | `string` | **Required**. instructor's username to fetch              |
| `filterType`| `string` | **Required**. filter type like title or subject to fetch  |
| `key`       | `string` | **Required**. search info to fetch                        |

#### Get user's all data

```http
  GET /login/:username
```

| Parameter   | Type     | Description                             |
| :---------- | :------- | :---------------------------------------|
| `username`  | `string` | **Required**. user's username to fetch  |

#### Get all refund requests

```http
  GET /getAllRefundRequests
```

#### Get user's refund request for a certain course

```http
  GET /getRefundRequestsByCourseIdUsername/:username/:courseId
```
| Parameter   | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `username`  | `string` | **Required**. user's username to fetch               |
| `courseId`  | `string` | **Required**. the course id the user wants to refund |


#### Admin create corporate trainee

```http
  POST /createCorporateTrainee
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `admin`     | `string` | **Required**. admin's username                       |
| `username`  | `string` | **Required**. corporate trainee username             |
| `password`  | `string` | **Required**. corporate trainee username             |


#### Admin create admin

```http
  POST /createAdmin
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `admin`     | `string` | **Required**. admin's username                       |
| `username`  | `string` | **Required**. the new admin's username               |
| `password`  | `string` | **Required**. the new admin's password               |

####  create course

```http
  POST /createCourse
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `id`     | `string` | **Required**. instructor's id                           |
| `title`  | `string` | **Required**. course title             |
| `subject`  | `string` | **Required**. course subject           |
| `totalHours`     | `number` | **Required**. course total hours               |
| `price`  | `number` | **Required**. course price             |
| `subtitles`     | `string` | **Required**. course subtitles can be multiple than one              |
| `exercises`  | `string` | **Required**. course exercises        |
| `summary`  | `string` | **Required**. course summary        |
| `discount`  | `number` | course discount            |
| `date`  | `date` |  discount end date           |
| `image`  | `string` |image for a course         |
| `prerequisite`  | `string` | **Required**. course prerequisite          |
| `previewURL`  | `string` | **Required**. preview video url          |
| `category`  | `string` | **Required**. course category          |


#### Admin create instructor

```http
  POST /createInstructor
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `admin`     | `string` | **Required**. admin's username                       |
| `username`  | `string` | **Required**. the instructor username               |
| `password`  | `string` | **Required**. the instructor password               |


#### create individual trainee

```http
  POST /createIndividualTrainee
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `username`  | `string` | **Required**. trainee username               |
| `password`  | `string` | **Required**. trainee password               |
| `firstname`     | `string` | **Required**. trainee first name                       |
| `lastname`  | `string` | **Required**.  trainee last name                |
| `age`  | `string` | **Required**.  trainee age                  |
| `gender`  | `string` | **Required**.  trainee gender                 |
| `email`  | `string` | **Required**.  trainee email                   |


#### create report

```http
  POST /createReport
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `username`  | `string` | **Required**. user's username              |
| `usertype`  | `string` | **Required**. user's password               |
| `description`| `string` | **Required**. report description                       |
| `reportType`| `string` | **Required**.  report type can be technical               |


#### create request to access a course

```http
  POST /createIndividualTrainee
```
| Body        | Type     | Description                                          |
| :---------- | :------- | :----------------------------------------------------|
| `username`  | `string` | **Required**. trainee username               |
| `password`  | `string` | **Required**. trainee password               |
| `firstname`     | `string` | **Required**. trainee first name                       |
| `lastname`  | `string` | **Required**.  trainee last name                |
| `age`  | `string` | **Required**.  trainee age                  |
| `gender`  | `string` | **Required**.  trainee gender                 |
| `email`  | `string` | **Required**.  trainee email                   |



















## Feedback

If you have any feedback, please reach out to us at 
[Our linkedin page](https://www.linkedin.com/company/thestartupcompany)
or email us via [gmail](https://mail.google.com/mail/u/0/?fs=1&to=theStartupCompany@gmail.com&su=ContactUs&tf=cm)

## Authors
- [@Ali Ghieth](https://www.github.com/alighieth)
- [@Abdelrahman Ali](https://www.github.com/AbdelrahmanAli12)

