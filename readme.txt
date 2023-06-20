Date Created: June 19, 2023
Project Name: Nut Face
Project Purpose: This is a social media outlet for memes
Project Author: Justin Brierley


Date: June 19, 2023

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






Date: June 20, 2023

- create 'util' folder in 'src' directory
  * create 'form-validate.js' in src/util 
  * create 'isUsernameExists.js' in src/util