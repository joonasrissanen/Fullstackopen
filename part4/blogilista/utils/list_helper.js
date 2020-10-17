const { countBy, maxBy } = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach(blog => total += blog.likes);
  return total;
};

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((a, b) => a.likes > b.likes ? a : b);
  return mostLikes;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map(b => b.author);
  const freqs = countBy(authors);
  const objs = Object.keys(freqs).map(key => {
    return  { 'name': key, 'blogs': freqs[key]};
  });
  const max = maxBy(objs, 'blogs');
  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};