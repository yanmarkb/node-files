const fs = require("fs");
const axios = require("axios");

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

function webCat(url) {
	axios
		.get(url)
		.then((response) => {
			console.log(response.data);
		})
		.catch((err) => {
			console.error(`Error fetching ${url}:\n  ${err}`);
			process.exit(1);
		});
}

const pathOrUrl = process.argv[2];

if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
	webCat(pathOrUrl);
} else {
	cat(pathOrUrl);
}
