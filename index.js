// Expressions to initiate Server:
const express = require('express');
const app = express();
const port = 8000;
app.listen(port, () => console.log(`App is now listening on port: ${port}`));
app.use(express.json());
const users = [
  {
    id: 1,
    name: 'Isaac',
    password: '123456',
  },
];

// Request Handlers:

app.post('/api/users', (req, res) => {
  // Create a new user:
  const newUser = req.body;

  // Pushes new user to users array
  users.push(newUser);

  // Returns Created User with created status code
  res.status(201).json(newUser);
});

app.get('/api/users', (req, res) => {
  // Returns all users:
  res.json(users);
});
app.get('/api/users/:id', (req, res) => {
  // Returns specified user with ID:
  const id = req.params.id;
  const user = users.find((i) => i.id == id);
  !user
    ? res.status(404).json({ message: 'User does not exist' })
    : Object.assign(user, req.body);
  res.status(200).json(user);
});
