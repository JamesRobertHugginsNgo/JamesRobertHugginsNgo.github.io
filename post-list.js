import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

async function* markdownHeaders(stream) {
	let line = [];
	let isInvalidLine = false;

	for await (const chunk of stream) {
		for (const char of chunk) {
			if (char === '\n') {
				if (line.length === 0) {
					isInvalidLine = true;
				}

				if (isInvalidLine) {
					isInvalidLine = false;
					continue;
				}

				yield line.join('');
				line = [];
				continue;
			}

			if (isInvalidLine) {
				continue;
			}

			if (line.length === 0) {
				if (char === ' ' || char === '\t') {
					continue;
				}
				if (char !== '#') {
					isInvalidLine = true;
					continue;
				}
			}

			line.push(char);
		}
	}
	if (line.length > 0) {
		yield line.join('');
	}
}

function buildDateStamp(date) {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth()).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	const ss = String(date.getSeconds()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}-${hh}-${min}-${ss}`;
}

function getCommitedOnDate(filePath) {
	try {
		const commitedOn = childProcess.execSync(`git log -1 --format=%cI -- "${filePath}"`, {
			cwd: path.dirname(filePath),
			encoding: 'utf8',
		}).trim();

		if (commitedOn !== '') {
			return new Date(commitedOn);
		}
	} catch (error) {
		console.error('Not able to get git log');
	}
}

const cwd = process.cwd();
const folder = process.argv[2] || cwd;
const folderPath = path.resolve(folder);

if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
	console.error('Not a valid directory:', folderPath);
	process.exit(1);
}

const files = fs
	.readdirSync(folderPath)
	.filter((file) => {
		return file
			.toLowerCase()
			.endsWith('.md');
	});

if (files.length === 0) {
	console.error(`No files found in ${folderPath}`);
	process.exit(1);
}

const posts = [];

for (const file of files) {
	const filePath = path.join(folderPath, file);

	if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
		console.error('Not a valid file:', filePath);
		continue;
	}

	let stream;
	try {
		stream = fs.createReadStream(filePath, { encoding: 'utf8' });
		const headers = markdownHeaders(stream);
		const header = await headers.next();
		const title = header.value?.slice(1).trimStart() ?? file;
		const modifiedOn = fs.statSync(filePath).mtime;
		const commitedOn = getCommitedOnDate(filePath);
		const post = {
			title,
			filePath: path.relative(cwd, filePath),
			modifiedOn,
			commitedOn,
			date: commitedOn ?? modifiedOn
		};
		posts.push(post);
	} catch (error) {
		console.error('An error has occured', error);
	} finally {
		stream.destroy();
	}
}

const list = posts
	.sort(({ date: dateA }, { date: dateB }) => {
		return dateB - dateA;
	})
	.map(({ title, filePath, date }) => {
		return `- [${title}](${filePath})  \n${date.toLocaleString('en-US', { timeZone: 'America/Toronto' })}`;
	})
	.join('\n');

const filename = `post-list-${buildDateStamp(new Date())}.md`;
const outputPath = path.join(process.cwd(), filename);
fs.writeFileSync(outputPath, list, 'utf8');
console.log(`Created: ${outputPath}`);
