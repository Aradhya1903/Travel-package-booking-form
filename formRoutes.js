const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/submit-form', (req, res) => {
//   const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));
  
  const name = req.body.name;
  const email = req.body.email;

  function containsOnlyLetters(name) {
    const letterRegex = /^[A-Za-z]+$/;
    return letterRegex.test(name);
    // const name = "JohnDoe";
    if (containsOnlyLetters(name)) {
      console.log("Name contains only letters!");
    } else {
      console.log("Name contains numbers or special characters!");
    }

  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    
if (isValidEmail(email)) {
  console.log("Valid email!");
} else {
  console.log("Invalid email!");
}
  }
  // const { name, email, message } = req.body;

  // Validate form inputs
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }
  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Invalid name' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!isValidMessage(message)) {
    return res.status(400).json({ error: 'Invalid message' });
  }


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function containsOnlyLetters(name) {
    const letterRegex = /^[A-Za-z]+$/;
    return letterRegex.test(name);
  }
  
  
  // Process the form data
  // ...

  // Store the data in a database
  // ...
  const formData = {
    name,
    email,
    message,
  };

  db.collection('forms').insertOne(formData, (error, result) => {
    if (error) {
      console.error('Failed to store form data:', error);
      return res.status(500).json({ error: 'Failed to store form data' });
    }

    

  // Send a response
  return res.status(200).json({ message: 'Form submitted successfully' });
  
    res.send('Form submitted successfully!');

});
})

module.exports = router;

