function randomTask() {
    var taskList = [
        {name:"take a walk!", description: "Check out some parks near you", img: "images/walk.png",link:"https://www.google.com/maps/search/parks+near+me/"},
        {name:"drink some water!", description: "Stay hydrated!", img: "images/water.png",link:"https://giphy.com/gifs/thirsty-drink-water-stay-hydrated-iIdijgFZtkssLeoJmO"},
        {name:"stretch!", description: "You've been sitting for a long time!", img: "images/stretch.png",link:"https://www.youtube.com/watch?v=JJAHGpe0AVU"},
        {name:"doodle!", description: "Unleash your creativity", img: "images/doodle.png",link:"https://www.youtube.com/watch?v=JJAHGpe0AVU"},
        {name:"write in your journal!", description: "Reflect on your day", img: "images/write.png",link:"https://penzu.com/"},
        {name:"listen to some music!", description: "Have a little dance party", img: "images/music.png",link:"https://www.youtube.com/watch?v=qNKcQYK7bBQ"},
        {name:"read a book!", description: "Get lost in a new story", img: "images/book.png",link:"https://www.readanybook.com/"},
        {name:"take a screen break", description: "Give your eyes a rest", img: "images/eyes.png",link:"#"}
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
    taskIcon.onclick=function(){
        window.open(currentTask.link);
    }
    

    
}