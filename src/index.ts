import { readFileSync } from "fs";
import fetch from "node-fetch";
import * as Types from "./typings/types";
import { Constants } from "./Constants";

class Client {
    /**
     * Client api key
     */
    token: string;

    /**
     * API base url
     */
    BASE_URL: string;

    /**
     * Creates new api client
     * @param token API key
     */
    constructor(token?: string) {

        /**
         * API base url
         */
        this.BASE_URL = Constants.BASE_URL;

        if (!token && typeof process.env.SNOWAPI_TOKEN === "string") {
            Object.defineProperty(this, "token", {
                value: process.env.SNOWAPI_TOKEN
            });
        } else if (!token) {
            throw new Error("Token was not provided to the client!");
        } else {
            Object.defineProperty(this, "token", {
                value: token
            });
        }
    }

    /**
     * Returns meme object
     * @param sbr Subreddit
     */
    async meme(sbr?: string): Promise<Types.MemeResponse> {
        const response = await this._request(`meme${!!sbr && typeof sbr === "string" ? `?sbr=${encodeURIComponent(sbr)}` : ""}`, "JSON");

        const data = {
            ...response,
            createdAt: response.createdAt instanceof Date ? response.createdAt : new Date(response.createdAt)
        };

        return data;
    }

    /**
     * Returns fake discord bot token
     */
    async discordToken(): Promise<string> {
        const response = await this._request("token", "JSON");
        return response.token || "";
    }

    /**
     * AI chatbot
     */
    async chatbot(options: Types.AIChatbotInterface): Promise<string> {
        const { name, gender, message, user } = options;
        if (!message) throw new Error("missing message for chatbot");

        const chatbotparams = () => {
            let u = "";
            if (!!name) u += `&name=${encodeURIComponent(name)}`;
            if (!!gender) u += `&gender=${encodeURIComponent(gender)}`;
            if (!!user) u += `&user=${encodeURIComponent(user)}`;

            return u;
        }

        const response = await this._request(`chatbot?message=${encodeURIComponent(message)}${chatbotparams()}`, "JSON");
        return response.message || "sorry, I can't understand.";
    }

    /**
     * Random cat image
     */
    async cat(): Promise<Buffer> {
        const res = await this._request("cat", "BUFFER");
        return res;
    }

    /**
     * Random dog image
     */
    async dog(): Promise<Buffer> {
        const res = await this._request("dog", "BUFFER");
        return res;
    }

    /**
     * Random duck image
     */
    async duck(): Promise<Buffer> {
        const res = await this._request("duck", "BUFFER");
        return res;
    }

    /**
     * Random fox image
     */
    async fox(): Promise<Buffer> {
        const res = await this._request("fox", "BUFFER");
        return res;
    }

    /**
     * Random roast
     */
    async roast(): Promise<string> {
        const res = await this._request("cat", "JSON");
        return res.roast || "";
    }

    /**
     * Pokemon info
     * @param name Pokemon name or id
     */
    async pokemon(name: string): Promise<Types.PokemonResponse> {
        const res = await this._request(`pokemon?name=${name}`, "JSON");
        return res;
    }

    /**
     * Morse code encoder/decoder
     * @param data message to encode/decode
     * @param type ENCODE or DECODE
     */
    async morseCode(data: string, type: "ENCODE" | "DECODE"): Promise<string> {
        const res = await this._request(`morse/${type === "DECODE" ? "decode" : "encode"}?text=${data}`, "JSON");
        return res.data || "";
    }

    /**
     * get package information from deno registry
     * @param moduleName Module name
     */
    async deno(moduleName: string): Promise<Types.DenoResponse> {
        const res = await this._request(`/registry/deno?module=${moduleName}`, "JSON");
        return res;
    }

    /**
     * get package information from npm registry
     * @param moduleName Module name
     */
    async npm(moduleName: string): Promise<Types.NPMResponse> {
        const res = await this._request(`/registry/npm?module=${moduleName}`, "JSON");
        return res;
    }

    /**
     * get package information from pypi registry
     * @param moduleName Module name
     */
    async pypi(moduleName: string): Promise<Types.PypiResponse> {
        const res = await this._request(`/registry/pypi?module=${moduleName}`, "JSON");
        return res;
    }

    /**
     * Reverse a message
     * @param message Message to reverse
     */
    async reverse(message: string): Promise<string> {
        const res = await this._request(`/reverse?message=${message}`, "JSON");
        return res.message || "";
    }

    /**
     * Returns discord bot token information
     * @param token Discord bot token
     */
    async tokeninfo(token: string): Promise<Types.TokenInfo> {
        const res = await this._request(`/tokeninfo?token=${token}`, "JSON");

        return res;
    }

    /**
     * Returns API stats
     */
    async stats(): Promise<Types.StatsResponse> {
        const res = await this._request("/stats", "JSON");

        return res;
    }

    /**
     * Returns current user info
     */
    async me(): Promise<Types.MeResponse> {
        const res = await this._request("/me", "JSON");

        return res;
    }

    /**
     * Base64 encoder/decoder
     * @param data message to encode/decode
     * @param type ENCODE or DECODE
     */
    async base64(data: string, type: "ENCODE" | "DECODE"): Promise<string> {
        const res = await this._request(`base64/${type === "DECODE" ? "decode" : "encode"}?data=${data}`, "JSON");
        return res.data || "";
    }

    /**
     * Private method used to request
     * @private
     * @ignore
     */
    private _request(path: string, type: "BUFFER"): Promise<Buffer>;
    private _request(path: string, type: "JSON"): Promise<any>;

    private _request(path: string, type: "BUFFER" | "JSON"): Promise<Buffer|any> {
        return fetch(`${this.BASE_URL}/api/${path}`, {
            headers: {
                "Authorization": this.token
            }
        })
        .then(async res => {
            if (res.status !== 200) {
                let json: any;

                try {
                    json = await res.json();
                } catch(e) {}

                if (res.status >= 500) throw new Error(`[API_INTERNAL_ERROR_${res.status}] ${json && json.error || res.statusText}`);

                switch(res.status) {
                    case 400:
                    case 401:
                    case 403:
                    case 404:
                    case 429:
                        throw new Error(`[API_ERROR_${res.status}] ${json && json.error || res.statusText}`);
                }
            }

            return type === "BUFFER" ? res.buffer() : res.json();
        })
        .then(res => {
            if (res.error) throw new Error(`[API_ERROR] ${res.error}`);
            return res;
        });
    }

    static get version(): string {
        const path = `${__dirname}/../package.json`;
        const raw = readFileSync(path, "utf-8");
        const json = JSON.parse(raw);

        return json["version"];
    }

}

export { Client, Constants };
export default Client;