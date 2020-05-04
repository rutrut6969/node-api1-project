const express = require('express');
const server = express();

let lessons = [
  {
    id: 1,
    name: 'Introduction to HTTP APIs with Node and Express',
  },
  {
    id: 2,
    name: "Let's git it!",
  },
];

server.get('/', (req, res) => {
  res.json({ api: 'Up and Running' });
});

const port = 8000;

server.listen(port, () => console.log(`Running on port ${port}`));
server.use(express.json());

server.get('/api/lessons', (req, res) => {
  // Return an array of lessons (id, name)

  res.json(lessons);
});

server.post('/api/lessons', (req, res) => {
  const lessonInformation = req.body;

  lessons.push(lessonInformation);

  res.status(201).json(lessonInformation);
});
