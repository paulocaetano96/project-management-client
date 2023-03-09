# Project Name

    Team Comms

<br>

## Description

    A web solution for amateur sports teams and leagues, that includes event scheduling, team communication, documentation repository,
    roster management and photo gallery.

<br>

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** If user is player, he gets access to signup page and, with the received link, he is able to join the club and pick his role.!!!!!!!!!!!!!!!
- **Login:** As a user I can login to the platform so that I can access my profile and team functionalities.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Homepage:** As a user, after we successfully login, we are sent to homepage in which we can messages and navigate the website
- **Profile Page:** As a logged in user I can visit my profile page so that I can access the edit profile page and see my member card.
- **Edit Profile:** User change their profile information, such as nickname, upload photo, document details.
- **Documentation Page:** As a logged in user, I can view uploaded documents
- **Photo Gallery:** As a logged in user I can see and upload pictures to the club's photo gallery
- **Calendar Page:** As a logged in user, I can check all events and within them, the event's information.
<!-- -  **Chat Page:** As a logged in user, I can chat with any and all club members.
 -->

- **STAFF RELATED FUNCTIONALITIES:**

  - **Signup:** As an anonymous user I can sign up on the platform, if user chooses role of Staff, he gets access to create club page thus - creating a link that will be sent to players for them to join the created club."
  - **Club Details:** As a user(STAFF) I can see and/or edit the club's details, view signup link to be sent to club members that want to join the club.
  - **Documentation Page:** As staff, I can add, edit, read and delete (CRUD) documents.
  - **Homepage** As staff, I can add, edit, read and delete (CRUD) messages.
  - **Calendar Page:** As staff, I can add, edit, read and delete (CRUD) events and their details.

## Backlog

- chat
- standings
- notifications
- Read by (when a user checks/reads a message)
- team polls
- search bar for messages
- social signup/login

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                 | Component       | Permissions                 | Behavior                                                                                                      |
| -------------------- | --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/login`             | Login           | anon only `<AnonRoute>`     | Login form, navigates to home page after login.                                                               |
| `/signup`            | Signup          | anon only `<AnonRoute>`     | Signup form, navigates to login page after signup. Ability to create Club via form if user selects staff Role |
| `/`                  | HomePage        | public `<Route>`            | Home page.                                                                                                    |
| `/user-profile`      | Profile         | user only `<PrivateRoute>`  | Staff and player profile for the current user.                                                                |
| `/user-profile/edit` | EditProfile     | user only `<PrivateRoute>`  | Edit user profile form.                                                                                       |
| `/calendar`          | Calendar        | user only `<PrivateRoute>`  | Show calendar page.                                                                                           |
| `/documentation`     | Documentation   | user only `<PrivateRoute>`  | Shows uploaded documentation                                                                                  |
| `/gallery`           | Gallery         | user only `<PrivateRoute>`  | Displays Photo Gallery                                                                                        |
| `/club-details`      | ClubDetails     | user only `<PrivateRoute>`  | Display club details.                                                                                         |
| `/club-details/edit` | EditClubDetails | staff only `<PrivateRoute>` | Edit display details                                                                                          |

## Components

Components:

- Member Card
- Navbar
- Add / Edit Message
- Add / Edit Documents
- Add / Edit Photos
- Add / Edit Events ??????
- Create Club form

Pages:

- Login
- Signup
- Homepage
- Gallery
- Documentation
- Calendar
- Club Details
- Edit Club Details ??????
- User Profile
- Edit User Profile ??????

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Message Service**

  - `messageService` :
    - `.getMessages()`
    - `.getOneMessage(id)`
    - `.updateMessage(id, messageData)`
    - `.addMessage(messageData)`
    - `.deleteMessage(id)`

- **Event Service**

  - `eventService` :
    - `.getEvents()`
    - `.getOneEvent(id)`
    - `.addEvent(eventData)`
    - `.updateEvent(id, eventData)`
    - `.deleteEvent(id)`

- **Document Service**

  - `documentService` :
    - `.getDocuments()`
    - `.getOneDocument(id)`
    - `.updateDocument(id, documentData)`
    - `.addDocument(documentData)`
    - `.deleteDocument(id)`

- **Photo Service**

  - `photoService` :
    - `.getPhotos()`
    - `.addPhoto(photoData)`
    - `.deletePhoto(id)`

- **Club Detail Service**

  - `clubDetailService` :
    - `.getClubDetails(id)`
    - `.updateClubDetails(id, clubData)`
    - `.createClub(clubData)`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    //role of user, should be: admin, staff, player
    role: {
      type: String,
      required: [true, "Role is required: Player, Staff"],
    },
    //filled automatically using the club key, generated by a staff memeber
    club: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
```

**Club model**

```javascript
 {

    name: {
        type: String,
        required: true,
        trim: true,
    },
    sport: {
        type: String,
        trim: true,
    },
    primaryColor: {
        type: String,
        default: '#a8d5e5',
    },
    secondaryColor: {
        type: String,
        default: '#372b25',
    },
    teams: [
        {
        type: String,
        trim: true,
    }
    ],
}, {
    timestamps: true,
}
```

**Event model**

```javascript
 {

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    start: {
        type: Date,
        trim: true,
    },
    end: {
        type: Date,
        trim: true,
    },
    allDay: {
        type: Boolean,
    },
    eventType: {
        type: String,
    },
    color: {
        type: String,
        default : '#2596be',
    },
}, {
    timestamps: true,
}
```

**Message model**

```javascript
{

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    event: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Event'
        }
    ],
    expiration: {
        type: Date,
        /* !??!!??!?!?!?!?!?!??!?!?!?!?!??!?!?!?!?!?!?!?!?!? */
    },
    sentTo: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    readBy: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],

}, {
    timestamps: true,
}

```

**Document model**

```javascript
{

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
}

```

**Photo model**

```javascript
{

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
}

```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                                                 | Success status | Error Status | Description                                                                                                                                                                                                                    |
| ----------- | ---------------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                                                | 200            | 404          | Check if user is logged in and return profile page                                                                                                                                                                             |
| POST        | `/auth/signup`         | {name, email, password, role, clubDetails}                   | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session. If user fills CREATE TEAM FORM, then, also creates team and submits it and it's club details. |
| POST        | `/auth/login`          | {email, password}                                            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session                                                                                                             |
| POST        | `/auth/logout`         |                                                              | 204            | 400          | Logs out the user                                                                                                                                                                                                              |
| GET         | `/api/messages`        |                                                              |                | 400          | Show all messages associated with the user                                                                                                                                                                                     |
| GET         | `/api/messages/:id`    |                                                              |                |              | Show specific message                                                                                                                                                                                                          |
| POST        | `/api/messages`        | { title, description, sentTo, event, expiration }            | 201            | 400          | Create and save a new message                                                                                                                                                                                                  |
| PUT         | `/api/messages/:id`    | { title, description, sentTo, event, expiration }            | 200            | 400          | edit message                                                                                                                                                                                                                   |
| DELETE      | `/api/messages/:id`    |                                                              | 201            | 400          | delete message                                                                                                                                                                                                                 |
| GET         | `/api/events`          |                                                              |                |              | Show all events associated with the user                                                                                                                                                                                       |
| GET         | `/api/events/:id`      |                                                              |                |              | Show specific event                                                                                                                                                                                                            |
| POST        | `/api/events`          | { title, description, start, end, allDay, eventType, color } | 201            | 400          | Create and save a new event                                                                                                                                                                                                    |
| PUT         | `/api/events/:id`      | { title, description, start, end, allDay, eventType, color } | 200            | 400          | edit events                                                                                                                                                                                                                    |
| DELETE      | `/api/events/:id`      |                                                              | 201            | 400          | delete event                                                                                                                                                                                                                   |
| GET         | `/api/documents`       |                                                              |                |              | Show all documents                                                                                                                                                                                                             |
| GET         | `/api/documents/:id`   |                                                              |                |              | Show specific document                                                                                                                                                                                                         |
| POST        | `/api/document`        | { title, description, url }                                  | 201            | 400          | Create and save a new document                                                                                                                                                                                                 |
| PUT         | `/api/document/:id`    | { title, description, url }                                  | 200            | 400          | edit document                                                                                                                                                                                                                  |
| DELETE      | `/api/document/:id`    |                                                              | 201            | 400          | delete document                                                                                                                                                                                                                |
| GET         | `/api/photos`          |                                                              |                |              | Show all photos                                                                                                                                                                                                                |
| POST        | `/api/photos`          | { title, description, url }                                  | 201            | 400          | Create and save a new photo                                                                                                                                                                                                    |
| DELETE      | `/api/photos/:id`      |                                                              | 201            | 400          | delete photo                                                                                                                                                                                                                   |
| GET         | `/api/clubDetails/:id` |                                                              |                | 400          | Show Club Details                                                                                                                                                                                                              |
| PUT         | `/api/clubDetails/:id` | { name, sport, primaryColor, secondaryColor, teams }         | 200            | 400          | edit club details                                                                                                                                                                                                              |

<br>

## API's

Mystery API only seen on friday, maybe something with dogs or pokemons or sports related by hint of my colleague

<br>

## Packages

mobiscroll || @mui/material || toastify || Axios

mongoose; Ironlauncher; multer; cloudinary; multer-storage-cloudinary; react-router-dom;

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link]()

[Server repository Link](https://github.com/paulocaetano96/project-management-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

⚒️ Paulo Caetano - [`GitHub`](https://github.com/paulocaetano96) - [`LinkedIn`](https://www.linkedin.com/in/paulocaetano-dev/)

🗿 Alexandre Álvaro - [`GitHub`](https://github.com/AleAlvo) - [`LinkedIn`](https://www.linkedin.com/in/alexandre-alvaro/)
