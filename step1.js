const fs = require("fs");

function cat(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading ${path}:\n  ${err}`);
			process.exit(1);
		} else {
			console.log(data);
		}
	});
}

const path = process.argv[2];
cat(path);
