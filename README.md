

# mulli

<br>

## Description

This is an app for illustrators who want to prove themselves. 
The goal is to create a community for all artists, fostering an environment of healthy competitiveness and with which to improve your skills and portfolio.

El objetivo es crear un lugar virtual de reunión para todos los artistas, fomentando un ambiente de competitividad sana y con la que poder mejorar tus skills y portfolio.

## User Stories

- **Landing Page:** As an anon I can see the landing page with an intro, active challenge/es, how to and sign up/login form.
-  **Signup:** As an anon I can sign up in the platform so that I can start joining challenges and manage my work.
-  **Login:** As a user/admin I can login to the platform so that I can start joining challenges and manage my work.
-  **404:** As an anon/user/admin I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

-  **Landing Page:** As a user/admin I can see the landing page with active challenge/es (and join them), and how to.
- **User Dashboard:** As a user/admin I can access my dashboard to see all challenges I'm joining/ have joined and update/edit images.
- **User Profile:** As a user/admin I can edit/update my profile and add an avatar.
-  **User Profile/Logout:** As a user/admin I can logout from the platform so no one else can use it.
-  **Challenges List:** As a user/admin I can see a list of all challenges.
-  **Challenges Detail:** As a user/admin I can see the datil of a Challenges with dynamic information based on its status (active, joined, voting,closed).

- **User Dashboard:** as an admin I can access to the challenges manager
- **Challenges Manager:** as an admin I can create, edit and delete challenges


### Challenges Status

-  **Draft:** These challenges that I don't want to show anywhere
-  **Active:** These challenges that are "joinable" and "submitable" for the users
-  **Voting:** Status for the challenges that are closed for submissions (it allows to vote the arts you like)
-  **Closed:** Status for closed challenges (it only allows to see the arts)

## Backlog

Challenges:
- add a featured section for the top 3
- add start and end date to update the status automatically.
- add categories to challenges.
- challenges search.
- challenges multi-images.
- Add background images and dark/light option.
- Add a preview for challenges creator.

User profile:
- add notifications for challenges status changes, ranking...
- add points and rank system based on participation, votes...
- convert users to admin based on their rank.
- Users search.
- Limit to 3 votes per user on each challenge


Tournament:
- create periodic tournaments: pack of thematic challenges with a winner based on the likes of all the challenges.


<br>


# Client / Frontend

## Routes
| Path                            | Component            | Permissions | Behavior                                                     |
| -------------------------       | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                             | LandingPage          | public      | Home page, signup form, login form,                          |
| `/not-found`                    | NotFoundPage         | public      | Not found page                                               |
| `/challenges`                   | ChallengeListPage        | user only   | Shows all challenges in a list                                  |
| `/challenges/:challengeId`      | ChallengeDetailPage      | user only   | Shows the details of a Challenge                                 |
| `/dashboard/:userId`            | DashboardPage        | user only   | Shows the details of a user and all user's challenges           |
| `/profile/:id`                  | ProfilePage          | user only   | Profile form for update                                      |
| `/challenges/manager`           | ChallengesManagerPage   | admin only  | Shows all challenges in lists based on their status             |
| `/challenges/:challengeId/add`  | AddChallengePage         | admin only  | Form for add a new Challenge                                     |
| `/challenges/:challengeId/edit` | AddChallengePage         | admin only  | Form for edit a Challenge                                        |



## Components

### Pages
  - LandingPage
  - NotFoundPage
  - ChallengeListPage
  - ChallengeDetailPage
  - DashboardPage
  - ProfilePage
  - ChallengesManagerPage
  - AddChallengePage
  - EditChallengePage 

### Components
  - ChallengeCard
  - BurgerMenu
  - Wellcome
  - CurrentChallengeSection
    - ChallengeDetail
  - HowTo
  - RegisterForm
  - ChallengeForm
  - ChallengeTable
  - EditProfile

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Challenges Service
  - getAllChallenges()
  - getOneChallenge()
  - AddOneChallenge(newChallenge)
  - UpdateChallenge(id, updateChallenge)
  - DeleteOneChallenge(id)
  
- Art Service 
  - getAllArts()
  - getOneArt()
  - AddOneArt(newArt)
  - UpdateArt(id, updateArt)
  - DeleteOneArt(id)

<br>


# Server / Backend


## Models

User model

```javascript
{
  isAdmin:boolean,
  name:String,
  username:String ,
  email:String, // required & unique
  password:String, // required
  instagram:String,
  website:String,
  avatar:String
  
}
```

Challenge model

```javascript
 {
   name:String,
   startDate:String,
   endDate: String,
   startVotingDate:String,
   endVotingDate: String,
   description: String,
   creator:  {type: Schema.Types.ObjectId,ref:'User'},
   illustrators: Number,
   totalVotes: Number
 }
```

Art model

```javascript
{
  user: {type: Schema.Types.ObjectId,ref:'User'},
  challenge: {type: Schema.Types.ObjectId,ref:'Challenge'},
  image: String, 
  votes: [{type: Schema.Types.ObjectId,ref:'User'}],
  rankingPosition: Number,
  //uploadDate: String
}
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                                           | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /dashboard                                    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| GET         | /dashboard/:userId                            | {userId}                     |                | 400          | show user data, his arts and the challenges has played          |
| GET         | /dashboard/profile                            | Saved session                |                |              | show a form filled with the user info                        |
| PUT         | /dashboard/profile/edit                       | {userUpdate}                 |                |              | edit user data                                                   |
| PUT         | /dashboard/profile/password/edit              | {newPassword}                |                |              | edit password                                                    |
| GET         | /dashboard/art/add                            | {artId, artUpdated}          |                |              | add art                                          |
| DELETE      | /dashboard/art/:artId/delete                  | {artId, artUpdated}          |                |              | edit art (update image)                                      |
| POST        | /auth/signup                                  | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                                   | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password challenges (404), then stores user in session |
| POST        | /auth/logout                                  | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | /challenges                                   |                              |                | 400          | Show all challenges                                             |
| POST        | /challenges/add                               | {}                           | 201            | 400          | Create and save a new challenge                                  |
| GET         | /challenges/:challengeId                      | {id}                         |                |              | Show specific challenge                                          |
| GET         | /challenges/:challengeId/edit/                |                              |                |              | get info and fill form                                       |
| PUT         | /challenges/:challengeId/edit/                | {challengeUpdated}           | 200            | 400          | edit challenge                                                   |
| DELETE      | /challenges/:challengeId/delete               | {challengeId}                | 201            | 400          | delete challenge                                                 |



<br>


## Links

### Trello/Kanban

[Trello board](https://trello.com/b/gpSU0hrj/mulli)

### Git

[Client repository Link](https://github.com/esthersinnick/mulli-frontend)

[Server repository Link](https://github.com/esthersinnick/mulli-backend)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com)