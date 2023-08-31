// Load existing entries from the API and display them on page load
window.addEventListener('DOMContentLoaded', () => {
    loadEntries();
});

const addInput = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let myObj = {
        name: name,
        email: email
    };
    
    axios.post("https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment", myObj)
        .then((response) => {
            console.log(response);
            appendEntry(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    alert('Form data saved!');
};

const appendEntry = (entry) => {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        populateEditForm(entry);
    });

    const entriesContainer = document.getElementById('entries-container');

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const entryDetails = document.createElement('p');
    entryDetails.textContent = `Name: ${entry.name}, Email: ${entry.email}`;
    entryDetails.setAttribute('data-id', entry.id); // Set data attribute for identification

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteEntry(entry._id, entryDiv);
    });

    entryDiv.appendChild(entryDetails);
    entryDiv.appendChild(editButton);
    entryDiv.appendChild(deleteButton);

    entriesContainer.appendChild(entryDiv);
};
// Add this function to populate the edit form
const populateEditForm = (entry) => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitButton = document.querySelector('.form-container form button');

    nameInput.value = entry.name;
    emailInput.value = entry.email;

    // Change submit button behavior to edit mode
    submitButton.textContent = 'Save Edit';
    submitButton.removeEventListener('click', addInput); // Remove previous click listener
    submitButton.addEventListener('click', () => {
        editEntry(entry._id, nameInput.value, emailInput.value);
    });
};
// Add this function to edit the entry
const editEntry = (id, newName, newEmail) => {
    let myObj = {
        name: newName,
        email: newEmail
    };

    axios.put(`https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment/${id}`, myObj)
        .then((response) => {
            console.log(response);
            updateEntryInUI(id, newName, newEmail);
        })
        .catch((err) => {
            console.log(err);
        });

    alert('Form data updated!');
};

// Add this function to update the entry in the UI
const updateEntryInUI = (id, newName, newEmail) => {
    const entryDiv = document.querySelector(`.entry p[data-id="${id}"]`);
    if (entryDiv) {
        entryDiv.textContent = `Name: ${newName}, Email: ${newEmail}`;
    }
};
const deleteEntry = (id, entryDiv) => {
    axios.delete(`https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment/${id}`)
        .then((response) => {
            console.log(response);
            entryDiv.remove(); // Remove the entry from the UI
        })
        .catch((error) => {
            console.log(error);
        });
};

const loadEntries = () => {
    axios.get("https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment")
        .then((response) => {
            console.log(response);
            response.data.forEach((entry) => {
                appendEntry(entry);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
