user = require("./user");
util = require("util");


console.log("test nodejs", user.a, b);
console.log(util.format("test %s %d %j", "string", 345, {"gg":55}));
console.log(util.inspect(module));
