import fs from 'node:fs';
import path from 'node:path';

function buildDateStamp(date) {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	const ss = String(date.getSeconds()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}-${hh}-${min}-${ss}`;
}

function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-') // non-alphanumeric -> dash
		.replace(/^-+|-+$/g, '');    // trim leading/trailing dashes
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error('Usage: node post-new.js <Post Title Words...>');
	process.exit(1);
}

const now = new Date();
const dateStamp = buildDateStamp(now);
const title = args.join(' ');
const slug = slugify(title);
const filename = `${dateStamp}-${slug}.md`;

const outputPath = path.join(process.cwd(), filename);

if (fs.existsSync(outputPath)) {
	console.error(`File already exists: ${outputPath}`);
	process.exit(1);
}

const isoDate = new Date().toISOString();
const frontmatter = `<!-- @metadata yaml
title: "${title.replace(/"/g, '\\"')}"
date: ${now.toISOString()}
-->

# ${title}
`;

fs.writeFileSync(outputPath, frontmatter, 'utf8');
console.log(`Created: ${outputPath}`);
