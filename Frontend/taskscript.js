function randomTask() {
    var taskList = [
        {name:"take a walk!", description: "Check out some parks near you", img: "images/walk.png"},
        {name:"drink some water!", description: "Stay hydrated!", img: "images/water.png"},
        {name:"stretch!", description: "You've been sitting for a long time!", img: "images/stretch.png"},
        {name:"doodle!", description: "Unleash your creativity", img: "images/doodle.png"},
        {name:"write in your journal!", description: "Reflect on your day", img: "images/write.png"},
        {name:"listen to some music!", description: "Have a little dance party", img: "images/music.png"},
        {name:"read a book!", description: "Get lost in a new story", img: "images/book.png"},
        {name:"take a screen break", description: "Give your eyes a rest", img: "images/eyes.png"}
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
    taskIcon.src = currentTask.img;
    
}