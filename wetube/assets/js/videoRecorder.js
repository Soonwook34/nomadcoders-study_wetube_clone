const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = event => {
    console.log(event);
};

const startRecording = () => {
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
};

const getVideo = async () => {
    try {
        // 권한 물어보기
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        // 권한 없음 or 실패
        console.log(error);
        recordBtn.innerHTML = "☹️ Cant record";
    } finally {
        // 녹화 버튼을 한 번 누르면 비활성화
        recordBtn.removeEventListener("click", getVideo);
    }
};

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}