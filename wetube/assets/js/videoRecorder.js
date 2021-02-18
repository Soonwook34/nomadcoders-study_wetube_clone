const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
    try {
        // 권한 물어보기
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    } catch (error) {
        console.log(error);
        // 권한 없음 or 실패
        recordBtn.innerHTML = "☹️ Cant record";
        recordBtn.removeEventListener("click", startRecording);
    }
};

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
    init();
}