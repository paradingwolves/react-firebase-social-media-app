Date Created: June 19, 2023
Project Name: Sun Parlour Baseball League Website
Project Purpose: This is a social media outlet for Sun Parlour Baseball League
Project Author: Justin Brierley


-------------------- Date: June 19, 2023 --------------------

- installed chakra ui
 * npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

- installed react-router-dom 
 * npm i react-router-dom

 - created a file called 'routes.js' inside the src/lib' directory
  * this file contains all routes for the project

- created components directory in src folder
    * created components/auth directory
    * created Register.js
    * created Login.js

- Styled Login page
- Added working routes to Login and Register Pages

- initialized Firebase project in Firebase Console
- created .env file with SDK Keys for our Firebase project
- added .env to .gitignore (we will add environment variables in vercel when we deploy later)

- add useLogin method to hooks/auth.js
- use useLogin() in components/auth/Login
- import useToast in hooks/auth.js
  * create toast message for successful logins
  * create toast message for failed logins


- installed react-hook-form
  * npm i react-hook-form



-------------------- Date: June 20, 2023 --------------------

- create 'util' folder in 'src' directory
  * create 'form-validate.js' in src/util 
  * create 'isUsernameExists.js' in src/util

- import 'emailValidate' and 'password' validate methods from 'form-validate.js' into Login.js



-------------------- Date: June 21, 2023 --------------------

- added a test user to Firebase Users 
- Login Form now works
  * form resets after successful Login
  * form validation works (Incorrect credentials get error message)

- created a navbar that will display on every route
  * created 'Home' and 'Logout' buttons

- create logout and sign in hooks
  * create toast messages for both 
  
- create Register page/functionality 
  * create useRegister hook in hooks/auth.js
  * create UI for Register page
  * users can now register am account

ERROR: user is redirected to login page after signing in -> should redirect to DASHBOARD
PROBLEM SOLVED: users created in Firebase console cannot be redirected to the DASHBOARD because a user id was not generated
  - user id is only generated in the Register form, not the console 


-------------------- Date: June 27, 2023 --------------------

- added <Sidebar /> to `Layouts/index.jsx`
- by default this appears on the left side of the screen, which is not desired for this project
  * to fix, wrap the <Sidebar /> and the <Outlet /> elements like so: 
        <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px"><Box w="900px"><Outlet /><Sidebar /></ Box></ Flex>

- add ActiveUser Component to Sidebar 
  * user profile picture
  * display username
  * Edit Profile button and Avatar link to "Edit Profile" element
  * All Users button links to "All Users" element

- Time to start developing the Dashboard 
- create the Post form using Chakra UI components
- to prevent scrolling within text box and have it automatically resize: npm i react-textarea-autosize

- created 'posts.js' in 'hooks' directory
  * handles the creation of posts
- logged in users can now add a post to the Firebase db with the form on the dashboard
  * a toast message will alert the user if the post was successful

  
-------------------- Date: July 3, 2023 --------------------

- create PostLists component
- create post component

-------------------- Date: July 5, 2023 --------------------

Posts are now being retrieved from the Firestore DB. Post component uses Header component. The header component 
contains the profile picture and username of the poster, as well as a timestamp for when the post was created.

- complete PostList & Post components
- create Header component for Post
  * Post is the structure of a single post which is fed by the Firestore db called 'posts'
  * Header is the header for each post
  * PostList maps thru Post objects 

- create file users.js in /hooks directory
  * this file has all of the user related hooks
    1. useUser: 
    2. 