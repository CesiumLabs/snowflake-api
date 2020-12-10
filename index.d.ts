declare module "snowflake-api" {
export class API {
    constructor(Token: string);

    public chatbot(message: string, name: string, gender: string, userid: string): Promise<string>;
    public token(): Promise<String>;
    public meme(subreddit: string): Promise<Object>;
    public cat(): Promise<ArrayBuffer>;
    public dog(): Promise<ArrayBuffer>;
    public duck(): Promise<ArrayBuffer>; 
    public fox(): Promise<ArrayBuffer>;
    public roast(): Promise<String>;
    public pokemon(name: string): Promise<Object>;
    public morse(message: string, type: string): Promise<String>;
    public registry(query: string, registry: string): Promise<Object>;
    public reverse(message: string): Promise<String>;
    public tokeninfo(token: string): Promise<Object>;
    public base64(message: string, type: string): Promise<String>;
    public me(): Promise<Object>;
    public on(error): error
}

export const version: string;
}