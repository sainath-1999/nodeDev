
Hello world welcome dev node.

------------------Episode - 06 | Database, Schema & Modules and mongoose--------------------

- Create a free cluster on MongoDB official website (mongo atlas)
- Install mongoose library
- Connect your application to the Database "connection-url/devTinder"
- Call the connectDB function and connect the database before starting appliction on 7777
- Create a user scehma & usef model  
- Create a POST /signup API to add data to database
- Push some documnets using API calls from the postman.
- Error handling using try, catch 

- Js Object vs JSON (difference).
- Add the express.json middleware to your APP.
- Make your signup API dynamic to recive data from the end user.
- User.findOne with duplicate email ids, which object returned
- API- Get user by emailId
- API - Feed API - GET /feed - get all the users from the database
- API - GET user by ID
- Create a delete user API
- API - Update a user
- Explore the mongoose documentation for the model method (https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete())
- What are options in model.findOneandUpdate method, explor 
- API to update user data using emailID

---------Data sanitaization and schema validation --------------

- Explore the schema types options from the documentation 
- Add required , unique, lowercase, mim, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in scehma
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post API 
- Data Sanitaization - Add API validation for each field.
- Install validator 
- Explore validator library function and validator function for the password, email, photoUrl.
- NEVER TRUST res.body

---------- Encrypting Passwords-----------------------------

passwords should be stored in a encryt manner(hash format) in the database 

- validate in signup API 
- Install bcrypt package
- Create a password hash using bcrypt.hash and users with encrypted password.
- Create logon API
- Compare passwords and throw errors if email or password is invalid


--------Episode 10 | Authentication & Schema validation--------------

- istall cookie-parse
- just send a dummy cookie to user 
- Create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it to user in cookies.
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware 
- Add the userAuth middle ware in profile and a new sendConnection Request API 
- set the expiry of JWT token and cookies for the 7 days like your wish

------------Episode 11 | Diving into the APIs and express Router--------------

- Expore tinder APIs
- Create a list of all API you can think of in DEv Tinder
- Group multiple routes under tge reective routers 
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers 
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
