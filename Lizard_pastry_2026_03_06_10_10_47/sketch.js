function setup() {
  createCanvas(600, 800);
  frameRate(1);
}

function draw() {
  background(440);
  noStroke();
  
// Declare a variable to keep track of iteration.
let x = 10; y = 0; z=0;

// Repeat as long as x < 100
while (x > 0) {
  
  for (let counter=0; counter<10; counter+=1){
    
    square(0+y,0+counter*100+z,x+100);
    fill(0,30);
    
    rect(0+y,10+counter*100+z,x+y+100);
    fill(random(["#ff9900", "#339966","#9933ee", "#222222", "#Feefb2"]));
   
  }

  
  x -= 1;
  y +=100;
  z -=20;

}
  
}