# Backend API Documentation

## User Endpoints

### `/users/register` Endpoint

#### Description

Registers a new user by creating a user account with the provided information.

#### HTTP Method

`POST`

#### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

#### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT Token.

### `/users/login` Endpoint

<!-- markdownlint-disable MD024 -->
#### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

#### HTTP Method

`POST`

#### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address.
- `password` (string, required): User's password.

#### Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT Token for authentication.

### `/users/profile` Endpoint

#### Description

Retrieves the profile information of the currently authenticated user.

#### HTTP Method

`GET`

#### Authentication

Requires a valid JWT token in the `Authorization` header:  
`Authorization: Bearer <token>`

#### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.

### `/users/logout` Endpoint

#### Description

Logs out the current user and invalidates the token.

#### HTTP Method

`GET`

#### Authentication

Requires a valid JWT token in the `Authorization` header or cookie.

#### Example Response

- `message` (string): "Logout successful."

---

## Captain Endpoints

### `/captains/register` Endpoint

#### Description

Registers a new captain by creating a captain account with the provided information.

#### HTTP Method

`POST`

#### Request Body

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name.
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.
- `vehicle` (object):
  - `color` (string, required): Vehicle color.
  - `plate` (string, required): Vehicle plate number.
  - `capacity` (number, required): Vehicle passenger capacity.
  - `vehicleType` (string, required): Type of vehicle.

#### Example Response

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
  - `email` (string): Captain's email address.
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (string): JWT Token.

### `/captains/login` Endpoint

#### Description

Authenticates a captain and returns a JWT token.

#### HTTP Method

`POST`

---

### `/maps/get-coordinates` Endpoint

#### Description

Retrieves latitude and longitude for a given address.

#### HTTP Method

`GET`

#### Request Parameters

- `address` (string, required): The address to geocode.

#### Example Response

```json
{
  "lat": 37.4224764,
  "lng": -122.0842499
}
