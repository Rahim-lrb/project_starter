/*
! storing (cookies)
we store the incoming things from server in cookies
- npm i cookie-parser / const cookieParser = require('cookie-parser') 
- app.use(cookieParser()) => parses the incoming cookies from request to JSON value.
in the server
- response.cookie("cookieName", "value", options)
maxAge or expires: 60 (expire date in ms) - domain (which the cookie is valid.) - path - secure: true (only to https by default)
httpOnly: true (accessible only through thr http protocol) - sameSite ()

access
- req.cookies => obj that contains the values of all cookies sent by the client in the http request (includes signed and unsigned cookies)
- res.cookies => cookies that will be send back to client (browser).

* signed in cookie 
Signed cookies are cookies that have a cryptographic signature. This signature is generated on the server side, 
and it allows the server to verify the integrity of the cookie data.
- app.use(cookieParser('your-secret-key'));
- res.cookie('myCookie', 'myValue', { signed: true });
- req.signedCookies => obj contains the values of only the signed cookies sent by the client in the HTTP request.

*/ 


/*
! bcrypt (layer protection) 
bcrypt is a password-hashing function designed to securely hash passwords. It's a popular choice for securely 
storing passwords in databases. Here's why bcrypt is commonly used and why it's essential:

! hashing password (bcrypt library)
is a crucial step in securing user credentials (password), we convert the plain-text password into a complex string and save it in the db
and exchange it with the client, so when a leakage happens they can't reach the real password
- npm i bcrypt / const bcrypt = require('bcrypt');
bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    if (err) {     Handle error
        console.error(err);
    } else {   Store the hashed password in the database
        console.log('Hashed Password is :', hash);
        . you can use it in your db as you want
    }
});
- salt round is used to complicate the hashed p (default 10), the more you increase it, the more it takes to process it.
* comparing the coming password (when logging in) and the hashed password from db
bcrypt.compare(Password, hashedPasswordFromDB, function(err, result) {
    if (err) {     Handle error
        console.error(err);
    } else if (result) {                 Passwords match
        console.log('Password is correct');
    } else {              Passwords don't match
        console.log('Password is incorrect');
    }
});
*/ 


/*
! json web tokens (jwt) stateless auth
JSON Web Tokens (JWT) provide a stateless authentication mechanism, often used in web development. it consist of 3 parts: the header
, payload( non-sensitive data such as user IDs ) , and signature (used by the server to verify the token's authenticity.)
- when you login the user confirm your identity using the credentials, and generate the token
- the token is a complex script that hashed both the header and the payload you send, and the signature you generated can unlock it
asdijazdpakd.azodoazdj.oapzdazjdo the first for header, payload, signature
- send that token to the client to save it in his browser
- then it'd be used in every request in the header of it 
. jwt.sign({}, "secret string", {options})
1st obj includes the, the secret string is the signature you want to use , the options for additional info like expiresIn: 3d

const headers = {
    Authorization: `Bearer ${token}`,
};

axios.get(apiUrl, { headers })
    .then(response => {
        console.log(response.data);
    })


*/ 

