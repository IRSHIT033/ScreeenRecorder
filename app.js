const video=document.querySelector("video")
let start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    let mimeType = 'video/webm';
    mediaRecorder = createRecorder(stream, mimeType);
})

stop.addEventListener('click', function(){
    mediaRecorder.stop();
   
})

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
}

function createRecorder (stream, mimeType) {
  
  let recordedChunks = []; 

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };
  mediaRecorder.onstop = function () {
     saveFile(recordedChunks);
     recordedChunks = [];
  };
  mediaRecorder.start(200);
  return mediaRecorder;
}

function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    video.src= URL.createObjectURL(blob)
    //let filename = window.prompt('Enter file name'),
      ///  downloadLink = document.createElement('a');
    //downloadLink.href = URL.createObjectURL(blob);
   /// downloadLink.download = `${filename}.webm`;

   // document.body.appendChild(downloadLink);
   // downloadLink.click();
  //  URL.revokeObjectURL(blob); // clear from memory
  //  document.body.removeChild(downloadLink);
    
}