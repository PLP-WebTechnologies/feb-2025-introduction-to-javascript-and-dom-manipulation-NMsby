// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ----- TEXT CONTENT MANIPULATION -----
    
    // Store original text for reset functionality
    const textDemo = document.getElementById('text-demo');
    const originalText = textDemo.innerHTML;
    
    // Change text button event
    document.getElementById('change-text-btn').addEventListener('click', function() {
        textDemo.innerHTML = `
            <p>This text has been <span class="highlight">changed dynamically</span> using JavaScript!</p>
            <p>DOM manipulation allows you to modify content without reloading the page.</p>
        `;
    });
    
    // Reset text button event
    document.getElementById('reset-text-btn').addEventListener('click', function() {
        textDemo.innerHTML = originalText;
    });
    
    
    // ----- CSS STYLE MANIPULATION -----
    
    const styleDemo = document.getElementById('style-demo');
    const originalStyle = {
        backgroundColor: getComputedStyle(styleDemo).backgroundColor,
        padding: getComputedStyle(styleDemo).padding,
        borderRadius: getComputedStyle(styleDemo).borderRadius,
        fontSize: getComputedStyle(styleDemo).fontSize
    };
    
    // Change color button event
    document.getElementById('change-color-btn').addEventListener('click', function() {
        // Generate a random background color
        const randomColor = `rgb(
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}
        )`;
        
        styleDemo.style.backgroundColor = randomColor;
        styleDemo.style.color = 'white';
        styleDemo.style.transition = 'all 0.5s ease';
    });
    
    // Change size button event
    document.getElementById('change-size-btn').addEventListener('click', function() {
        styleDemo.style.padding = '30px';
        styleDemo.style.fontSize = '1.2em';
        styleDemo.style.borderRadius = '15px';
        styleDemo.style.transition = 'all 0.5s ease';
    });
    
    // Reset style button event
    document.getElementById('reset-style-btn').addEventListener('click', function() {
        styleDemo.style.backgroundColor = originalStyle.backgroundColor;
        styleDemo.style.padding = originalStyle.padding;
        styleDemo.style.borderRadius = originalStyle.borderRadius;
        styleDemo.style.fontSize = originalStyle.fontSize;
        styleDemo.style.color = '#333';
    });
    
    
    // ----- ELEMENT MANIPULATION -----
    
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    
    // Add task button event
    document.getElementById('add-task-btn').addEventListener('click', function() {
        addNewTask();
    });
    
    // Allow pressing Enter in the input field to add a task
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
    
    // Function to add a new task
    function addNewTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            // Create a new list item
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            
            // Add a double-click event to mark items as completed
            newTask.addEventListener('dblclick', function() {
                this.classList.toggle('removed');
            });
            
            // Add the new task to the list
            taskList.appendChild(newTask);
            
            // Clear the input field
            newTaskInput.value = '';
            
            // Focus back on the input for easy addition of multiple tasks
            newTaskInput.focus();
        } else {
            alert('Please enter a task!');
        }
    }
    
    // Remove task button event
    document.getElementById('remove-task-btn').addEventListener('click', function() {
        if (taskList.children.length > 0) {
            taskList.removeChild(taskList.lastElementChild);
        } else {
            alert('No tasks to remove!');
        }
    });
    
    
    // ----- EVENT HANDLING -----
    
    const eventDemo = document.getElementById('event-demo');
    const clickCounter = document.getElementById('click-counter');
    let clickCount = 0;
    
    // Mouse over event
    eventDemo.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#4a6fa5';
        this.style.color = 'white';
        this.innerHTML = '<p>You\'re hovering over me!</p>';
    });
    
    // Mouse out event
    eventDemo.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#e9ecef';
        this.style.color = '#333';
        this.innerHTML = '<p>Mouse over this box to see it change.</p>';
    });
    
    // Click counter event
    document.getElementById('click-btn').addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = `Number of times clicked: ${clickCount}`;
        
        // Change the button text after 5 clicks
        if (clickCount === 5) {
            this.textContent = 'Keep Going!';
        } else if (clickCount === 10) {
            this.textContent = 'You\'re a Pro!';
            // Add confetti effect (simple version)
            celebrateClick();
        }
    });
    
    // Simple confetti effect
    function celebrateClick() {
        const colors = ['#ffd166', '#06d6a0', '#118ab2', '#ef476f'];
        const container = document.querySelector('body');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'fixed';
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.borderRadius = '50%';
            confetti.style.opacity = '0';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s ease-out`;
            confetti.style.zIndex = '1000';
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                container.removeChild(confetti);
            }, 5000);
        }
        
        // Add keyframe animation to stylesheet
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                0% { transform: translateY(-100px); opacity: 1; }
                70% { opacity: 1; }
                100% { transform: translateY(${window.innerHeight}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});