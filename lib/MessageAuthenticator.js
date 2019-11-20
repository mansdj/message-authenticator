/**
 * This file is part of Message-Authenticator.
 * 
 * Message-Authenticator is free library: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Message-Authenticator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * @author David Mans, https://github.com/mansdj
 * @license GNU GPL see license.txt
 * 
 */
const crypto = require('crypto')

var MessageAuthenticator = (() => {

    /**
     * Validate the provided message authenticaton code with
     * the provided parameters, secret key against new message 
     * authentication code. 
     * 
     * @param {string} secret 
     * @param {string} mac 
     * @param {Array<string>} parameters 
     * @returns {boolean}
     * @throws {Error}
     */
    var VerifyRequest = (secret, mac, parameters) => {
        if(secret =='' || mac == '' || parameters == '') 
            return false

        if(!Array.isArray(parameters))
            throw new Error("Invalid parameters format, parameters should be in an array")

        let controlMac = GenerateMAC(secret, parameters)

        return (controlMac == mac)        
    }

    /**
     * Digest token and an array of strings to generate
     * a message authentication code 
     * 
     * @param {string} token 
     * @param {Array<string>} params 
     * @returns {string}
     */
    var GenerateMAC = (token, params) => {

        console.log(token)
        console.log(params)

        let macstr = ''

        if(Array.isArray(params)) {
            params.sort()

            for(param of params) {
                if(typeof param == 'string')
                    macstr += param
            }
        }

        macstr += token

        console.log(macstr)
        const sha = crypto.createHash('sha256')

        sha.update(macstr)
        
        return sha.digest('base64')        
    }

    return {
        VerifyRequest : VerifyRequest,
        GenerateMAC : GenerateMAC
    }
})()

module.exports = MessageAuthenticator