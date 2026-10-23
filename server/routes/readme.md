session config setup process
Step 2 — Understand the session configuration
Before writing it, understand the four settings we'll need:
Setting	Purpose
secret	Signs the session ID cookie to help detect tampering. It must be a strong, private secret.
resave	Controls whether a session is saved again when it hasn't changed.
saveUninitialized	Avoids saving new, untouched sessions unnecessarily.
cookie	Controls browser-cookie behavior, including security and expiration.