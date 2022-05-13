status = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video , 0,0,380,380);
    if(status != ""){
        objectDetector.detect(video , gotResults);

        for(i = 0; i <objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Detected Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected: " + objects.length;

            fill("Blue");
            percent = floor(objects[i].confidence * 100);
            text( objects[i].label + " " + percent +"%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("Blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = Window.speechSynthesis;
                utter_this = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utter_this);
            }else{
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objcts";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}