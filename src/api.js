const err = require('./APIError');
const base = 'http://api.snowflakedev.cf:9019/api'
const fetch = require("node-fetch");
let token;
const EventEmitter = require("events");
class API extends EventEmitter{
 
    constructor(Token){
        super()


        /**Token - API Token
         * @param {string} token API Token
         */


        if(!Token) throw new err("No API TOKEN was Provided");
        if(typeof(Token) != 'string') throw new err("Invalid type of API Key was provided");
        token = Token;
    }

    /**meme - Returns a meme from Subreddit
     * @param {string} subreddit Subreddit to get the meme from 
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


    /**chatbot - Message for AI Chatbot
     * 
     * @param {string} message Message for chatbot 
     * @param {string} name Name for the chatbot
     * @param {string} gender Gender of the chatbot
     * @param {string} user User id who triggered the chatbot
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


    /**roast - Returns a string
     * 
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


    /**dog - Returns buffer for image of a dog
     * 
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


    /**fox - Returns buffer for image of a fox
     * 
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


    /**duck - Returns buffer for image of a duck
     * 
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


    /**cat - Returns buffer for image of a cat
     * 
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


    /**morse - Returns string encoded in morse code or decoded from morse code 
     * 
     * @param {string} data Data to encode/decode
     * @param {string} type Type of request (encode/decode)
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


    /**base64 - Returns string encoded in base64 code or decoded from base64 code 
     * 
     * @param {string} data Data to encode/decode
     * @param {string} type Type of request (encode/decode)
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


    /**token - Returns a Discord Token (Invalid)
     * 
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


    /**tokeninfo - Fetches Info about user from Token 
     * 
     * @param {string} token Token to fetch data from 
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


    /**reverse - Revers a message
     * 
     * @param {string} message Message to reverse 
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
    
    
    /**registry - Search a package in npm, py or deno registry
     * 
     * @param {string} query Package to Search
     * @param {string} registry Registry to search the package in
     */


    async registry(query, type){
        if(!query) throw new err("No query was provided to search");
        if(!type) throw new err("No registry was specified");
        if(typeof(type) != 'string') throw new err(`Inalid type of string, recieved '${type(type)}', expected 'string'`);
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


    /**pokemon - Returns data about a pokemon
     * 
     * @param {string} pokemon Name of the pokemon 
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


    /**me - Returns info about token
     * 
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