function randomTask() {
    var taskList = [
        {name:"take a walk!", description: "Check out some parks near you", img: 'https://ibb.co/nRJLdkN'},
        {name:"drink some water!", description: "Stay hydrated!", img: "/images/water.png"},
        {name:"stretch?", description: "You've been sitting for a long time!", img: "/images/water.png"},
        {name:"doodle?", description: "Unleash your creativity", img: "/images/water.png"},
        {name:"write in your journal", description: "reflect on your day", img: "/images/water.png"},
        {name:"listen to some music!", description: "have a little dance party", img: "/images/water.png"}
    ]

    // Picks a random fact
    var randomNumber = Math.floor(Math.random()*taskList.length);
    const currentTask= taskList[randomNumber];

    // Add it to the page.
    const taskTitle = document.getElementById('task-title');
    taskTitle.innerText = currentTask.name;

    const taskDescription = document.getElementById('task-subtext');
    taskDescription.innerText = currentTask.description;

    const taskIcon = document.getElementById('task-icon');
    taskIcon.innerText = '<img src="'+currentTask.img+'" height="50px"/>';
    
}