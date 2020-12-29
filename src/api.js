const err = require('./APIError');
const base = 'http://api.snowflakedev.cf:8342/api'
const fetch = require("node-fetch");
let token;
const EventEmitter = require("events");
/**
 * @example
         * const {API} = require("snowflake-api");
         * const api = new API("YOUR_TOKEN_HERE");
         * api.chatbot("hello", "Udit", "male").then(console.log);
         * api.meme().then(console.log)
 */
class API extends EventEmitter{
 
          /**
         * API
         * @param {string} Token - Your API Token found at http://api.snowflakedev.cf:8332/dashboard
         * @param {boolean} Check - Wheter to check if the API token provided is correct. Returns no error if check is completed
         * Note: if check is enabled, it will increase the request count for the API.
         */

    constructor(Token, check = false){
        super();
        if(!Token) throw new err("No API TOKEN was Provided");
        if(typeof(Token) != 'string') throw new err("Invalid type of API Key was provided");
        token = Token;
        if(check){
        fetch(base + '/chatbot?message=Test', {
            headers:{
                authorization: token
            }
        }).then(res =>{
            if(res.status !== 200){
                throw new err(`Something went wrong while Checking. Check your API Token or refer this message. \n Status Code: ${res.status} \n Status Text: ${res.statusText}`)
            }
        })
      }
    }

    /**
     * @param {string} sbr - Subreddit to search 
     * @returns {object} The meme object containing the link, subreddit, etc
     */


    async meme(sbr){
       let url = `${base}/meme`;
        if(sbr){
            url += `?sbr=${sbr}`
        }
        const res = await fetch(url, {
            headers:{
                authorization: token
            }
        });
        const response = await res.json();
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        if(response.error) {
          this.emit('error', response.error);
        return undefined;
        }
        return response;
    };


    
    /**
     * @param {string} message - The message provided 
     * @param {string} name - The name of the bot
     * @param {string} gender - The gender of the bot
     * @param {string} user - The user id
     * @returns {string} The message by the chatbot
     */


    async chatbot(message, name='Chatbot', gender='female', user='1'){
        if(!message) throw new err("No message was provided");
        if(typeof(name)!= 'string') throw new err(`Expected name to be string, recieved ${typeof(name)}`);
        if(typeof(gender)!= 'string') throw new err(`Expected gender to be string, recieved ${typeof(gender)}`);
        if(typeof(user)!= 'string') throw new err(`Expected user id to be string, recieved ${typeof(user)}`);
       
        const res = await fetch(`${base}/chatbot?message=${encodeURIComponent(message)}&name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&user=${encodeURIComponent(user)}`,{
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.message;
    }

    /**
     * @returns {string} The string containing the roast
     */


    async roast(){
        const res = await fetch(`${base}/roast`,{
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.roast; 
    }


    /**
     * @returns {buffer} Buffer of the dog Image
     */


    async dog(){
        const res = await fetch(`${base}/dog`, {
            headers:{
                'authorization': token
            }
        });
        const buffer = await res.buffer();
        if(res.status == 401){
            this.emit('error', 'Invalid API Key')
            return undefined;
        }
        return buffer;
    }


   /**
    * @returns {buffer} Buffer of the Fox Image
    */


    async fox(){
        const res = await fetch(`${base}/fox`,{
            headers:{
                'authorization': token
            }
        });
        const buffer = await res.buffer();
        if(res.status == 401){
            this.emit('error', 'Invalid API Key')
            return undefined;
        }
        return buffer;
    }


    /**
     * @returns {buffer} Buffer of the Duck Image
     */


    async duck(){
        const res = await fetch(`${base}/duck`,{
            headers:{
                'authorization': token
            }
        });
        const buffer = await res.buffer();
        if(res.status == 401){
            this.emit('error', 'Invalid API Key')
            return undefined;
        }
        return buffer;
    }


     /**
     * @returns {buffer} Buffer of the Cat Image
     */



    async cat(){
        const res = await fetch(`${base}/cat`,{
            headers:{
                'authorization': token
            }
        });
        const buffer = await res.buffer();
        if(res.status == 401){
            this.emit('error', 'Invalid API Key')
            return undefined;
        }
        return buffer;
    }


    /**
     * 
     * @param {string} data  The data to encode/decode
     * @param {string} type Wheter to encode or decode the data given
     * @returns {string} Processed data
     */


    async morse(data, type = 'encode'){

        if(!data) throw new err("No data was provided");
        if(typeof(type) != 'string') throw new err(`Excepted type to be 'string', recieved '${typeof(type)}'`);
        if(type !== 'encode' && type !== 'decode') throw new err(`Expected type to be 'encode' or 'decode', recieved ${type}`)
        const res = await fetch(`${base}/morse/${type}?text=${encodeURIComponent(data)}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.data;
    }


    /**
     * 
     * @param {string} data The data to be encoded/decoded 
     * @param {string} type Wheter to encode or Decode the data
     * @returns {string} Processed Data
     */


    async base64(data, type = 'encode'){
        if(!data) throw new err("No data was provided");
        if(type !== 'encode' && type !== 'decode') throw new err(`Expected type to be 'encode' or 'decode', recieved ${type}`);
        const res = await fetch(`${base}/base64/${type}?data=${encodeURIComponent(data)}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.data;
    }


   /**
    * @returns {string} Random NON-WORKING Discord Token
    */


    async token(){
        const res = await fetch(`${base}/token`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.token;
    }


    /**
     * 
     * @param {string} data The Discord Token to provide Info about
     * @returns {object} Info about the Token
     */


    async tokeninfo(data){
        if(typeof(data) != 'string' || !data) throw new err('Invalid Data provided');
        const res = await fetch(`${base}/tokeninfo?token=${encodeURIComponent(data)}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    }


    /**
     * 
     * @param {string} data The message to be reversed 
     * @returns {string} The message Reversed
     */


    async reverse(data){
        if(!data) throw new err("No message provided");
        const res = await fetch(`${base}/reverse?message=${encodeURIComponent(data)}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.message;
    }
    
    
    /**
     * 
     * @param {string} query The query to Search for 
     * @param {string} type Registry to search for. Valid Options: npm, pypi & deno
     * @returns {object} Information about the package found
     */


    async registry(query, type = 'npm'){
        if(!query) throw new err("No query was provided to search");
        if(!type) throw new err("No registry was specified");
        if(typeof(type) != 'string') throw new err(`Inalid type of string, recieved '${type(type)}', expected 'string'`);
        if(type !== 'npm' && type !== 'pypi' && type !== 'deno') throw new err(`Expected 'type' to be 'npm', 'pypi' or 'deno', recieved ${type}`);
        const res = await fetch(`${base}/registry/${type}?module=${encodeURIComponent(query)}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    }


    /**
     * 
     * @param {string} query The pokemon to search for
     * @returns {object} Info about the Pokemon
     */

    async pokemon(query){
        if(!query) throw new err("No query was provided to search");
        const res = await fetch(`${base}/pokemon?name=${encodeURIComponent(query.toLowerCase())}`, {
            headers:{
                'authorization': token
            }
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };


 /**
  * @returns {object} Info about the Token Owner
  */


     async me(){
         const response = await fetch(`${base}/me`, {
             headers:{
                 'authorization': token
             }
         });
         if(response.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
         const res = await response.json();
         if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
         return res;
     }
}
module.exports = API;
