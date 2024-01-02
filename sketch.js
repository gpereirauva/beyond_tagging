//keeps track of time
let timer = 0;

//this saves the mouse position
let pvmx = 0;
let pvmy = 0;

//this sets up the mic
let mic, recorder, soundFile;
let state = 0;

//this tracks if we started the recording of mouse movmt
let recmouse = 0;

// creates button item
let cnv;

function preload(){
img = loadImage('img.jpg'); // Load the image

}

function setup() {
  createCanvas(800, 500, SVG);
  background(img);
  
  //create button
  cnv = createButton('Start recording.');
  cnv.mousePressed(audioRec);

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
  
}


function draw() {
  strokeWeight(5);
  stroke(255, 204, 0);

   if (millis() >= 100+timer && recmouse == 1) {
    line(pvmx, pvmy, mouseX, mouseY);
    timer = millis();
    pvmx = mouseX;
    pvmy = mouseY;
  }
  
  
  
}

function audioRec() {
  // ensure audio is enabled

  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {
    userStartAudio();

    // record to our p5.SoundFile
    recorder.record(soundFile);
    
    state++;
  }
  else if (state === 1) {

    // stop recorder and
    // send result to soundFile
    recorder.stop();
        state++;

  } else if (state === 2){
    
    // download file
    save(soundFile, 'mySound.wav');

    state++;
  }
}


function audioRec() {
  // ensure audio is enabled
  userStartAudio();

  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundFile);

    cnv.html("Your voice and mouse are being recorded. Click here to end."); // Change the button's HTML content
    
    state++;
    recmouse++;
    
    //this starts the mouse at the right position
    
    pvmx = mouseX;
    pvmy = mouseY;
  }
  else if (state === 1) {

    // stop recorder and
    // send result to soundFile
    recorder.stop();
    
    cnv.html("Click here to download your files."); // Change the button's HTML content

    state++;
    recmouse++;
  }

  else if (state === 2) {
    save(soundFile, 'mySound.wav');
    state++;
    save('mySVG.svg');
    
    cnv.html("All done, please send it to us!."); // Change the button's HTML content
  }
}