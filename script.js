const taskInput = document.getElementById('taskInput');
const descriptionInput = document.getElementById('descriptionInput');
const imageInput = document.getElementById('imageInput');
const taskList = document.getElementById('taskList');
const blog = document.getElementById('blog');
const blogPosts = document.getElementById('blogPosts');

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDescription = descriptionInput.value.trim();

    if (taskText === '') {
        alert("Please enter a task.");
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    let imageElement = '';
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageElement = `<img src="${e.target.result}" alt="Task Image">`;
            taskItem.innerHTML = `
                    ${imageElement}
                    <div class="task-item-content">
                        <span>${taskText}</span>
                        <p class="description">${taskDescription}</p>
                        <div class="task-buttons">
                            <button class="complete-btn">Complete</button>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                    </div>
                `;
            taskList.appendChild(taskItem);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        taskItem.innerHTML = `
                <div class="task-item-content">
                    <span>${taskText}</span>
                    <p class="description">${taskDescription}</p>
                    <div class="task-buttons">
                        <button class="complete-btn">Complete</button>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
            `;
        taskList.appendChild(taskItem);
    }

    taskInput.value = '';
    descriptionInput.value = '';
    imageInput.value = '';
}

taskList.addEventListener('click', function(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');

    if (target.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
    } else if (target.classList.contains('edit-btn')) {
        const taskContent = taskItem.querySelector('span');
        const newText = prompt('Edit your task:', taskContent.textContent);
        if (newText) {
            taskContent.textContent = newText;
        }
    } else if (target.classList.contains('delete-btn')) {
        taskItem.remove();
    }
});

function loadBlog() {
    blog.style.display = 'block';
    taskList.style.display = 'none';

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            blogPosts.innerHTML = '';
            posts.slice(0, 10).forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    `;
                blogPosts.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function hideBlog() {
    blog.style.display = 'none';
    taskList.style.display = 'block';
}
taskList.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('complete-btn')) {
        const taskItem = target.closest('.task-item');
        if (taskItem) {
            taskItem.classList.toggle('completed');
        }
    } else if (target.classList.contains('edit-btn')) {
        const taskItem = target.closest('.task-item');
        const taskContent = taskItem.querySelector('span');
        const newText = prompt('Edit your task:', taskContent.textContent);
        if (newText) {
            taskContent.textContent = newText;
        }
    } else if (target.classList.contains('delete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.remove();
    }
});
