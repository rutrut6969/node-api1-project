// Expressions to initiate Server:
const express = require('express');
const app = express();
const port = 8000;
app.listen(port, () => console.log(`App is now listening on port: ${port}`));
app.use(express.json());
let users = [
  {
    id: 1,
    name: 'Isaac',
    bio: 'Hello',
  },
  {
    id: 2,
    name: 'John',
    bio: 'My name is john',
  },
];

// Request Handlers:

app.post('/api/users', (req, res) => {
  // Create a new user:
  const newUser = req.body;

  if (newUser.name && newUser.bio) {
    // Pushes new user to users array
    users.push(newUser);
    // Returns Created User with created status code
    res.status(201).json(newUser);
  } else {
    res
      .status(400)
      .send({ errorMessage: 'Please provide a name and bio for user' });
  }
});

app.get('/api/users', (req, res) => {
  // Returns all users:
  !users
    ? res
        .status(500)
        .send({ errorMessage: 'The users information could not be retrieved' })
    : users.map((user, i) => {
        if (user === null) {
          users.splice(i, 1);
        }
      }) && res.status(200).json(users);
});
app.get('/api/users/:id', (req, res) => {
  // Returns specified user with ID:
  const id = req.params.id;
  const user = users.find((i) => i.id == id);
  console.log(user);
  !user
    ? res.status(404).json({ message: 'User does not exist' })
    : Object.assign(user, req.body);

  !users
    ? res
        .status(500)
        .send({ errorMessage: "The user's information could not be retrieved" })
    : res.status(200).json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = users.find((i) => i.id == id);
  console.log(user);
  !user
    ? res.status(404).send({ errorMessage: 'User Does Not Exist' })
    : delete users[id - 1];
  res.status(200).json(users);
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((i) => i.id == id);
  const newInfo = req.body;
  const index = id - 1;
  let newUserArr = [...users];
  if (!user) {
    res.status(404).send({ message: 'USER DOES NOT EXIST' });
  } else if (!user.bio && !user.name) {
    res
      .status(400)
      .send({ message: 'Please provide a name and bio for the user' });
  } else {
    if (!newInfo.bio) {
      newUserArr[index] = { ...user, name: newInfo.name };
      users = newUserArr;
      res.status(200).json(users);
    } else if (!newInfo.name) {
      newUserArr[index] = { ...user, bio: newInfo.bio };
      users = newUserArr;
      res.status(200).json(users);
    } else {
      newUserArr[index] = { ...user, name: newInfo.name, bio: newInfo.bio };
      users = newUserArr;
      res.status(200).json(users);
    }
  }
});
