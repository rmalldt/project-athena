document.addEventListener('DOMContentLoaded', () => {
    getTopics();
  });

const logoutButton = document.querySelector('#logout');

async function logout(e) {
    console.log("hit")
    e.preventDefault();

    const headerslist = localStorage
    
    const dashboardResponse = await fetch('http://localhost:3000/users/logout', {
    method: 'DELETE',
    headers: headerslist,
      });

    localStorage.clear()
    window.location.href = './index.html';
}

async function getTopics(e) {
    console.log("hit2")

    try {
        const response = await fetch('http://localhost:3000/topics')
        const topics = await response.json()
        const topicsData = topics.data
    
        const gridItems = document.querySelectorAll('.classes > div');

        topicsData.forEach((topic, index) => {
            if (gridItems[index]) {
            //   gridItems[index].name.textContent = topic.title 
            //     <p>${topic.title}</p>
            //     <img src="${topic.image_url}" />
            //     <p>${topic.description}</p>
            //     <p>Progress: ${topic.progress}%</p>
            //   ;
            console.log(document.querySelector(`${gridItems[index]} .name`))
            console.log(gridItems[index].name)
            }
        })

    } catch (error) {
        console.error('Failed to fetch topics:', error);

    }

}

logoutButton.addEventListener('click', logout);
