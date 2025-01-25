document.addEventListener('DOMContentLoaded', () => {
    fetch('https://node-express-apis-theta.vercel.app/usersDB')
      .then(response => response.json())
      .then(users => {
        const userTableBody = document.querySelector('#userTable tbody');
        userTableBody.innerHTML = ''; // Clear existing rows
  
        users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
          `;
          userTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  });