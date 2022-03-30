const tasksDOM = document.querySelector('.tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');
const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const editContainer = document.querySelector('.edit-container');
const container = document.querySelector('.container');
const backToTasksBtn = document.querySelector('#back-to-tasks');

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const { tasks } = await (await fetch('/tasks')).json();
        if (tasks.length < 1) {
            tasksDOM.innerHTML =
                '<h5 class="empty-list">There is no tasks</h5>';
            loadingDOM.style.visibility = 'hidden';
            return;
        }
        const allTasks = tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task;
                return `
                <div class="single-task ${completed && 'task-completed'}">
                    <h5>
                        <span><i class="far fa-check-circle"></i></span>${name}
                    </h5>
                    <div class="task-links">
                        <button type="button" class="edit-btn" data-id="${taskID}">
                            <i class="fas fa-edit"></i>
                        </button>
                        
                        <button
                            type="button"
                            class="delete-btn"
                            data-id="${taskID}"
                            data-name="${name}"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                `;
            })
            .join('');
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = 'hidden';
};

showTasks();

tasksDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible';
        const id = el.parentElement.dataset.id;
        try {
            await fetch(`/tasks/${id}`, {
                method: 'DELETE',
            });
            showTasks();
            taskInputDOM.value = '';
            formAlertDOM.style.visibility = 'visible';
            formAlertDOM.textContent = `success, delete "${el.parentElement.dataset.name}" item`;
            formAlertDOM.classList.add('text-success');
        } catch (error) {
            console.log(error);
            formAlertDOM.style.visibility = 'visible';
            formAlertDOM.innerHTML = `error, please try again`;
        }
        setTimeout(() => {
            formAlertDOM.style.visibility = 'hidden';
            formAlertDOM.classList.remove('text-success');
        }, 3000);
    }
    if (el.parentElement.classList.contains('edit-btn')) {
        const id = el.parentElement.dataset.id;
        showEditArea();
        editFormDOM.dataset.id = id;
        showTask(id);
    }
    loadingDOM.style.visibility = 'hidden';
});

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value;

    try {
        await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        showTasks();
        taskInputDOM.value = '';
        formAlertDOM.style.visibility = 'visible';
        formAlertDOM.textContent = `success, task added`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        formAlertDOM.style.visibility = 'visible';
        formAlertDOM.innerHTML = `error, please try again`;
    }
    setTimeout(() => {
        formAlertDOM.style.visibility = 'hidden';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
});


const showTask = async (id) => {
    try {
        const { task } = await (await fetch(`/tasks/${id}`)).json();
        const { _id: taskID, completed, name } = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

backToTasksBtn.addEventListener('click', () => hideEditArea(true));

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...';
    e.preventDefault();
    try {
        const id = e.target.dataset.id;
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;

        const { task } = await (
            await fetch(`/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: taskName,
                    completed: taskCompleted,
                }),
            })
        ).json();

        const { _id: taskID, completed, name } = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
        formAlertDOM.style.visibility = 'visible';
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add('text-success');
        hideEditArea(true);
        showTasks();
    } catch (error) {
        console.error(error);
        formAlertDOM.style.visibility = 'visible';
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
        formAlertDOM.style.visibility = 'hidden';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
});

const hideEditArea = (e) => {
    if (e === true || e.target === editContainer) {
        editContainer.classList.remove('active');
        container.classList.remove('active');
        editContainer.removeEventListener('click', hideEditArea);
    }
};

const showEditArea = () => {
    document.querySelector('.edit-container').classList.add('active');
    container.classList.add('active');
    editContainer.addEventListener('click', (e) => hideEditArea(e));
};
