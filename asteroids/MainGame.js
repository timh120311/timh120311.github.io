let player_x = 600;
let player_y = 80;
let space_held = false;
let ufo_age = []
let ufo_x = [860]
let ufo_y = [90]
let ufo_vx = [3]
let ufo_vy = [2]
let got_hit = false
let game_tick = 0;
let MAX_AGE = 100;
let score = 0;
let lives = 100;
function setup() {
  createCanvas(1800, 580);
  rectMode(CENTER);
}

function draw() {
  background(0, 0, 0);
  draw_our_hero();
  control_hero();
  draw_text();
  detect_ufo_colide();

  if (game_tick % 20 == 0) {
    for (let i =0; i< 15; i++) {
      the_ufo_clones()
    }
  }
  if ((game_tick % 30 == 0) && (lives > 0)) {
    score++;
  }

  draw_our_dangerous_object();

  the_ufo_invades()
  game_tick++;
  despawn_ufo();
}

function draw_our_hero() {
  fill(255, 255, 255);
  rect(player_x, player_y, 9, 10);
}

function control_hero() {


  if (space_held === true) {
    player_x = mouseX;
    player_y = mouseY;
  } else {
    return false
  }
}

function keyPressed() {
  if (key == " ") {
    space_held = true;
  }
 if (key == "r"){
   score =  0;
   got_hit = false;
   lives = 100
 }
}

function keyReleased() {
  space_held = false;
}






function draw_our_dangerous_object() {
  for (let i = 0; i < ufo_x.length; i++) {
    fill(random(0, 255), random(0, 255), random(0, 255))
    rect(ufo_x[i], ufo_y[i], 10, 10)
  }
}

function the_ufo_invades() {
  for (let i = 0; i < ufo_x.length; i++) {
    ufo_x[i] += ufo_vy[i];
    ufo_y[i] += ufo_vy[i];
  }
}

function the_ufo_clones() {
  new_x = random(0, 1000)
  new_y = random(0, 1000)
  new_vx = random(-15, 15)
  new_vy = random(-15, 15)

  ufo_x.push(new_x)
  ufo_y.push(new_y)

  ufo_vx.push(new_vx)
  ufo_vy.push(new_vy)
  ufo_age.push(0);
}


function despawn_ufo() {
  for (let i = 0; i < ufo_age.length; i++) {
    ufo_age[i]++
    if (ufo_age[i] > MAX_AGE) {
      ufo_age.shift()
      ufo_x.shift()
      ufo_y.shift()
      ufo_vx.shift()
      ufo_vy.shift()

    }
  }
}

function draw_text() {
  fill(255, 255, 255)
  textSize(16)
  text(("Score: " + score), 9, 100);
  text(("Lives: " + lives), 100, 100);
  textFont('Ubuntu')
}


function detect_ufo_colide() {
  for (var i = 0; i < ufo_x.length; i++) {
    if ((ufo_x[i] - 5 < player_x + 5) && (ufo_x[i] + 5 > player_x - 5) && (ufo_y[i] - 5 < player_y + 5) && (ufo_y[i] + 5 > player_y - 5)) {
     // console.log("Test: A astroid has hit!")
     fill(255,0,0,50)
     rect(-10,-10, 10000,10000)
     got_hit = true;
     lives -= 1

   }
  }

}
