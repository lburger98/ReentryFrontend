const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// IMPORTANT: this is no longer being used
app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/jobseeker/:id', (req, res) => {
      console.log('booo')
      const actualPage = '/jobseeker';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/requests/:id', (req, res) => {
      console.log('blah')
      const actualPage = '/request';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });