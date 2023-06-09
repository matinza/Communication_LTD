const formData = {
  firstName: '',
  lastName: '',
  email: '',
};

let clients = [];
let showTable = false;
let searchQuery = '';

const homeButton = document.getElementById('homeButton');
const customerForm = document.getElementById('customerForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const getClientsButton = document.getElementById('getClientsButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const tableContainer = document.getElementById('tableContainer');
const toggleTableButton = document.getElementById('toggleTableButton');
const clientsTableBody = document.getElementById('clientsTableBody');

firstNameInput.addEventListener('input', (event) => handleChange(event, 'firstName'));
lastNameInput.addEventListener('input', (event) => handleChange(event, 'lastName'));
emailInput.addEventListener('input', (event) => handleChange(event, 'email'));
customerForm.addEventListener('submit', handleSubmit);
getClientsButton.addEventListener('click', handleGetClients);
searchInput.addEventListener('input', handleSearchQueryChange);
searchButton.addEventListener('click', handleSearch);
toggleTableButton.addEventListener('click', handleToggleTable);

window.addEventListener('load', handleGetClients);
homeButton.addEventListener('click', () => window.location.href = 'https://localhost:8080/home/home.html');

function handleChange(event, field) {
  formData[field] = event.target.value;
}

async function handleSubmit(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  try {
    await axios.post('https://localhost:4000/systemAddClient', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Client added successfully', true);
  } catch (error) {
    alert('Failed to add client', false);
  }
}

async function handleGetClients() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('https://localhost:4000/systemGetClients', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    });
    if (Array.isArray(response.data.clients)) {
      clients = response.data.clients;
      if (!showTable) {
        toggleTableButton.click();
      } else {
        displayClients();
      }
    }
  } catch (error) {
    alert('Failed to get clients', false);
  }
}

function handleSearchQueryChange(event) {
  searchQuery = event.target.value;
}

async function handleSearch() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`https://localhost:4000/systemSearchClients/${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (Array.isArray(response.data)) {
      clients = response.data;
      displayClients();
    }
  } catch (error) {
    alert('Failed to search clients', false);
  }
}

function handleToggleTable() {
  showTable = !showTable;
  if (showTable) {
    displayClients();
  } else {
    clientsTableBody.innerHTML = '';
    tableContainer.style.display = 'none';
  }
}

function displayClients() {
  clientsTableBody.innerHTML = '';
  if (Array.isArray(clients)) {
    for (let client of clients) {
      const row = document.createElement('tr');
      for (let field in client) {
        const cell = document.createElement('td');
        cell.textContent = client[field]; // This is unsafe!
        row.appendChild(cell);
      }
      clientsTableBody.appendChild(row);
    }
    tableContainer.style.display = 'block';
  }
}

