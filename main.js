document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchTerm').value.trim();
    const searchType = document.getElementById('searchType').value;
    const resultsDiv = document.getElementById('results');
    const loader = document.getElementById('loader');
    const message = document.getElementById('message');
  
    resultsDiv.innerHTML = ''; 
    message.innerHTML = ''; 
  
    
    if (searchTerm.length < 3) {
      message.innerHTML = 'Please enter at least 3 characters to search';
      return;
    }
  
    loader.style.display = 'block';
  
    let apiUrl = '';
    if (searchType === 'repositories') {
      apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`;
    } else {
      apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    }
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        loader.style.display = 'none'; 
  
       
        if (data.items.length === 0) {
          message.innerHTML = 'No results found';
          return;
        }
  
        
        data.items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
  
          if (searchType === 'repositories') {
            card.innerHTML = `
              <img src="${item.owner.avatar_url}" alt="${item.owner.login}">
              <h3>${item.name}</h3>
              <p>${item.description || 'No description provided'}</p>
              <p>⭐ Stars: ${item.stargazers_count}</p>
              <a href="${item.html_url}" target="_blank">View Repository</a>
            `;
          } else {
            card.innerHTML = `
              <h3>${item.login}</h3>
              <img src="${item.avatar_url}" alt="${item.login}" width="50" />
              <a href="${item.html_url}" target="_blank">View Profile</a>
            `;
          }
  
          resultsDiv.appendChild(card);
        });
      })
      .catch(error => {
        loader.style.display = 'none'; 
        message.innerHTML = 'Error fetching data';
        console.error('Error fetching GitHub data:', error);
      });
  });
  