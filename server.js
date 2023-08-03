
const express = require('express');
const mongoose = require('mongoose');
// const Form = require('./models/form');
const { MongoClient } = require('mongodb');
const mongoConnectionString = 'mongodb://localhost:27017';
const formRoutes = require('./formRoutes');

const app = express();
app.use('/http://127.0.0.1:5500/project-backend/structure.html', formRoutes);
app.get('/', (req, res) => {
    res.send('Welcome everyone!');
  });
  const port = 3000; // Replace with your desired port number

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
async function connectToMongo() {
  try {
    
    const client = new MongoClient(mongoConnectionString);
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the application if unable to connect
  }
}
let db;
connectToMongo()
  .then((database) => {
    db = database;
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the application if unable to connect
  });
  app.get('/form-data', async (req, res) => {
    try {
      // Fetch the form data from the database
      const formData = await Form.find();
  
      // Send the form data as a response
      res.json(formData);
    } catch (error) {
      // Handle any errors that occur during the fetch
      res.status(500).json({ error: 'An error occurred while fetching the form data' });
    }
  });
  // axios.get('/form-data')
  // .then(response){
  //   const formData = response.data;
  //   // Process the fetched form data
  //   // ...
 
  // }
  

fetchData();
  let currentPage = 1;
let totalPages = 1;

const fetchData = async () => {
  try {
    const response = await axios.get('/form-data');
    const formData = response.data;

    // Calculate the total number of pages
    totalPages = Math.ceil(formData.length / itemsPerPage);

    // Update the displayed form data based on the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedData = formData.slice(start, end);

    // Access the container element
    const container = document.getElementById('form-data-container');
    container.innerHTML = '';

    // Iterate over the sliced form data and create HTML elements to display it
    slicedData.forEach(data => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>Name:</strong> ${data.name}, <strong>Email:</strong> ${data.email}`;
      container.appendChild(div);
    });

    // Update the pagination buttons' visibility based on the current page
    updatePaginationButtons();
    const updatePaginationButtons = () => {
      const previousBtn = document.getElementById('previous-btn');
      const nextBtn = document.getElementById('next-btn');
    
      previousBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    };
  } catch (error) {
    console.error('An error occurred while fetching the form data:', error);
  }
};
