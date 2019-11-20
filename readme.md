# Message Authenticator

Library for symmetric authentication of messages transmitted to an API. The message authenticator digests the parameter values along with a symmetrical key and returns the digested code.  The Message Authentication Code (MAC) can be verified at either client or server level.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm install message-authenticator --save
```

## Usage
### Generating a Message Authentication Code (MAC)
```javascript
/**
* @param {string} token 
* @param {Array<string>} params 
* @returns {string}
*/
let secret = 'b1193d4b-4eb2-421a-8753-1e1de17d1863'
let params = ['apple', 'mango', 'orange']
let mac = MessageAuthenticator.GenerateMAC(secret, params)
//Mv+FQz1tHR97PL2Zg7UD7T0urtIRzll+CijZh0rpsNg=
```
### Verify a MAC
```javascript
/**
* @param {string} secret 
* @param {string} mac 
* @param {Array<string>} parameters 
* @returns {boolean}
* @throws {Error}
*/
let secret = 'b1193d4b-4eb2-421a-8753-1e1de17d1863'
let params = ['apple', 'mango', 'orange']
let mac = 'Mv+FQz1tHR97PL2Zg7UD7T0urtIRzll+CijZh0rpsNg='
let verified  = MessageAuthenticator.VerifyRequest(secret, mac, params)
//true
```
### In GET Request
The MAC would be included to the query string however the API key is stored on both the client and server.  **_The "secret" should never be transmitted between the two!_**
```
"https://example.com/api/v1/fruit=apple,mango,orange&mac=Mv+FQz1tHR97PL2Zg7UD7T0urtIRzll+CijZh0rpsNg="
```
### Development

Message-Authenticator is in the beginning stages of development with updates and bug fixes as needed.

### Bug Reporting

Please submit all issues at https://github.com/mansdj/message-authenticator/issues/new

### License
----

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
