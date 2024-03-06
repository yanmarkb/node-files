const fs = require("fs");
const axios = require("axios");

function cat(path, out) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading ${path}:\n  ${err}`);
			process.exit(1);
		} else {
			handleOutput(data, out);
		}
	});
}

function webCat(url, out) {
	axios
		.get(url)
		.then((response) => {
			handleOutput(response.data, out);
		})
		.catch((err) => {
			console.error(`Error fetching ${url}:\n  ${err}`);
			process.exit(1);
		});
}

function handleOutput(data, out) {
	if (out) {
		fs.writeFile(out, data, "utf8", (err) => {
			if (err) {
				console.error(`Couldn't write ${out}:\n  ${err}`);
				process.exit(1);
			}
		});
	} else {
		console.log(data);
	}
}

let pathOrUrl, out;
if (process.argv[2] === "--out") {
	out = process.argv[3];
	pathOrUrl = process.argv[4];
} else {
	pathOrUrl = process.argv[2];
}

if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
	webCat(pathOrUrl, out);
} else {
	cat(pathOrUrl, out);
}
