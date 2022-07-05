const {faker} = require("@faker-js/faker");
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const yaml = require('yaml');

const numPosts = parseInt(process.argv[3]);
const postsDir = path.join(process.argv[2]);

function formatMarkdown(post) {
    const {body} = post;
    delete post.body;
    return `---\n${yaml.stringify(post)}---\n\n${body}\n`
}

function generateRandomPost() {
  return {
    title: faker.lorem.words(5),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n\n"),
	slug: faker.lorem.words(2),
  };
}

function generateFile() {
    const post = generateRandomPost();
    const markdownContent = formatMarkdown(post);

    const basename = slugify(post.title, {strict: true, lower: true});
    const filePath = path.join(postsDir, `${basename}.md`);

    fs.writeFileSync(filePath, markdownContent);
}

Array(numPosts).fill().map(generateFile);

// [...Array(numPosts)].map(generateFile);

// const post = generateRandomPost();
// console.log(formatMarkdown(post));