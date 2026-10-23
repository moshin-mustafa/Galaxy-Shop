
AUTH ROADMAP

4. What we will build
We'll implement authentication in small stages instead of trying to build everything at once.
1. Understand authentication fundamentals
   
   Users, credentials, HTTP requests, authentication versus authorization.
2. Design the users table
   
   Store each user's ID, name, email, password hash, role, and timestamps as appropriate.
3. Registration
   
   Validate form input, check whether an email already exists, hash the password, and insert the user into PostgreSQL.
4. Login
   
   Find the user, verify their password, and return an appropriate response.
5. Sessions and cookies
   
   Keep the user logged in securely between requests.
6. Authentication middleware
   
   Protect private endpoints, such as the customer's order history.
7. Authorization and logout
   
   Enforce customer/admin permissions and terminate sessions correctly.
8. Frontend integration and testing
   
   Build login/register forms and test success, failure, and unauthorized requests.






The frontend collects his name, email, and password.

It sends a POST request to your Express backend.

Express validates the input.

The backend hashes the password.

PostgreSQL stores the new account.