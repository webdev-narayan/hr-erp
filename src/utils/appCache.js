const nodeCache = require("node-cache");
export const appCache = new nodeCache({ stdTTL: 1000 });
