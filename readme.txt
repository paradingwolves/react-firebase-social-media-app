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