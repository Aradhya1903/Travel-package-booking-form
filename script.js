const form = document.querySelector('myForm');
function handleFormSubmission(event) {

const emailInput = form.elements.email;
const emailError = document.querySelector('emailError');

if (!isValidEmail(emailInput.value)) {
  emailError.textContent = 'Please enter a valid email address.';
  emailError.style.display = 'block';
} else {
  emailError.style.display = 'none';
}
const contactInput = form.elements.email;
const contactError = document.querySelector('contactError');

if (!isValidcontact(contactInput.value)) {
  contactError.textContent = 'Please enter a valid contact.';
  contactError.style.display = 'block';
} else {
  emailError.style.display = 'none';
}

  const successMessage = document.querySelector('successMessage');
if (isFormValid()) {
    displaySuccessMessage();
    clearFormInputs();
}
}
function displaySuccessMessage() {
    const successMessage = document.querySelector('successMessage');
    successMessage.textContent = 'Form submitted successfully!';
    successMessage.style.display = 'block';
  }
  
  function clearFormInputs() {
    // Clear each input field by setting its value to an empty string
    form.elements.name.value = '';
    form.elements.email.value = '';
    form.elements.message.value = '';
  }
//     const form = document.querySelector('myForm');
// form.addEventListener('submit', handleFormSubmission);
//     event.preventDefault();
  
//     // Validate form inputs here
//   }
// Function to fetch and display form data
// function fetchFormData() {
//   fetch('/form-data')
//     .then(response => response.json())
//     .then(data => {
//       const formDataList = document.getElementById('formDataList');
//       formDataList.innerHTML = ''; // Clear previous data

//       if (data.success) {
//         data.formdata.forEach(formData => {
//           const listItem = document.createElement('li');
//           listItem.textContent = `Name: ${formData.name}, Email: ${formData.email}`;
//           formDataList.appendChild(listItem);
//         });
//       } else {
//         const listItem = document.createElement('li');
//         listItem.textContent = 'Failed to fetch form data.';
//         formDataList.appendChild(listItem);
//       }
//     })
//     .catch(error => {
//       const formDataList = document.getElementById('formDataList');
//       formDataList.innerHTML = '';

//       const listItem = document.createElement('li');
//       listItem.textContent = 'An error occurred. Please try again later.';
//       formDataList.appendChild(listItem);

//       console.error(error);
//     });
// }

// document.getElementById('myForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent form submission and page reload

//   const nameInput = document.getElementById('name');
//   const emailInput = document.getElementById('email');
//   const resultDiv = document.getElementById('result');

//   const name = nameInput.value.trim();
//   const email = emailInput.value.trim();

//   fetch('/submit', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name, email })
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.success) {
//       resultDiv.textContent = data.message;
//       resultDiv.style.color = 'green';
//       // Fetch and display form data after successful submission
//       fetchFormData();
//       // Optionally, you can reset the form after successful submission.
//       // document.getElementById('myForm').reset();
//     } else {
//       resultDiv.textContent = data.message;
//       resultDiv.style.color = 'red';
//     }
//   })
//   .catch(error => {
//     resultDiv.textContent = 'An error occurred. Please try again later.';
//     resultDiv.style.color = 'red';
//     console.error(error);
//   });
// });

// // Fetch and display form data when the page loads
// fetchFormData();
const itemsPerPage = 10;
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');

previousBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;


    fetchData();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchData();
  }
});
window.addEventListener('load', fetchData);
let filteredData = [];
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input').value;
  filterData(searchInput);
});
const filterData = (searchInput) => {
  filteredData = formData.filter((data) => {
    const name = data.name.toLowerCase();
    const email = data.email.toLowerCase();
    const search = searchInput.toLowerCase();

    return name.includes(search) || email.includes(search);
  });

  // Call the displayFilteredData function to update the displayed data
  displayFilteredData();
};
const displayFilteredData = () => {
  const container = document.getElementById('form-data-container');
  container.innerHTML = '';

  filteredData.forEach((data) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Name:</strong> ${data.name}, <strong>Email:</strong> ${data.email}`;
    container.appendChild(div);
  });
};
const resetData = () => {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';

  filteredData = [];
  fetchData();
};
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    resetData();
  }
});
const fetchData = async () => {
  // Fetch the form data from the database
  try {
    const response = await axios.get('/form-data');
    formData = response.data;

   // Call the displayFilteredData function to update the displayed data
    displayFilteredData();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('load', fetchData);

const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Retrieve form field values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate form fields
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Form is valid, proceed with registration
  registerUser(username, password);
});

const registerUser = (username, password) => {
  // You can make an API call here to register the user on the backend
  console.log('Username:', username);
  console.log('Password:', password);

  // Optionally, you can redirect the user to a login page after successful registration
  window.location.href = '/login.html';};

  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission and page reload
  
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const resultDiv = document.getElementById("result");
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let isValid = true;
  let errorMessage = "";

  if (!containsOnlyLetters(name)) {
    isValid = false;
    errorMessage += "Name must contain only letters.\n";
  }

  if (!isValidEmail(email)) {
    isValid = false;
    errorMessage += "Please enter a valid email address.\n";
  }

  if (isValid) {
    // Here, you can perform any additional actions, such as submitting the form data to a server via AJAX or saving it to a database.
    // For this example, we'll just display a success message.
    resultDiv.textContent = "Form submitted successfully!";
    resultDiv.style.color = "green";
    // Optionally, you can reset the form after successful submission.
    //document.getElementById("myForm").reset();
  } else {
    resultDiv.textContent = errorMessage;
    resultDiv.style.color = "red";
  }
  document.getElementById("myForm").reset();
});