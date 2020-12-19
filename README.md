# Snowflake API
Official API client for **snowflake-api**.

![Snowflake-API](https://nodei.co/npm/snowflake-api.png)

# Example

```js
const { Client } = require("snowflake-api");
// import Client from "snowflake-api" or import { Client } from "snowflake-api"

const client = new Client("API_KEY");

client.me().then(console.log); // user info

/*
{
  user: '480933736276426763',
  pro: true,
  ratelimits: 5000,
  banned: false,
  requests: '36',
  tokenCreatedTimestamp: 1608371383745,
  createdTimestamp: 1606890937906
}
*/
```

# Links
- **[Documentation](https://snowflake-api.js.org)**
- **[Discord Support Server](https://discord.gg/2SUybzb)**
- **[GitHub](https://github.com/DevSnowflake/snowflake-api)**

# Discord Server
[![](https://i.imgur.com/f6hNUfc.png)](https://discord.gg/2SUybzb)