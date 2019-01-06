const findFaces = async (video, canvas) => {
  let faces = await faceapi.detectAllFaces(video);
  console.log(faces.length);
  faceapi.drawDetection(canvas, faces, {
    "withScore": true
  });
};

window.onload = async () => {
  let video = document.querySelector('.webcam');
  let canvas = document.querySelector('.image');
  let ctx = canvas.getContext('2d');
  let webcam = await navigator.mediaDevices.getUserMedia({
    "video": true,
    "audio": false
  });

  await faceapi.loadSsdMobilenetv1Model('/models');
  await faceapi.loadFaceLandmarkModel('/models');
  await faceapi.loadFaceRecognitionModel('/models');

  video.srcObject = webcam;
  video.play();
  video.hidden = true;
  video.onloadedmetadata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    findFaces(video, canvas);
  }, 10);
  };
};
