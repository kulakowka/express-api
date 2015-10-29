# Simple application 

[![Join the chat at https://gitter.im/kulakowka/express-actions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kulakowka/express-actions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

#### Setup project:
```
git clone git@github.com:kulakowka/express-actions.git
cd express-actions
npm install
```

#### Start development server: 
```
npm start
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

#### Start production server: 
```
NODE_ENV=production MONGO_URL=mongodb://localhost/test PORT=8080 npm start
```

## Concept description

Any route may have one or more "Actions".

For example look at this: [app/routes/article/index.js](app/routes/article/index.js)

```javascript
// POST /articles
router.post('/', checkAuth, addUser, createArticle, redirectToArticle);

// GET /articles
router.get('/', findArticles, renderArticles);
```

In this example `checkAuth`, `addUser`, `createArticle`, `redirectToArticle`, `findArticles`, `renderArticles` is "Actions".

**Action** - is a simple function like this:

```javascript
function(req, res, next) {

};
```

**Main rule:** One action === one function. You should avoid writing functions that perform multiple actions.

For example, look at this: [app/actions/article/createArticle.js](app/actions/article/createArticle.js)

```javascript

import Article from '../../models/article';

export default (req, res, next) => {

  var article = new Article(req.body);

  article.save((error, article) => {
    if (error) return next(error);
    req.article = article;
    next();
  });

};

```

"Action" may modify `req` or `res` object and passes control to the next action by calling `next()`. 

If action failed you must call `next(new Error('Reason'))`.






