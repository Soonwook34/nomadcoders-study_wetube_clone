import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
// const deleteButton = document.getElementById("jsDeleteComment");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (comment) => {
    commentList.removeChild(comment);
    decreaseNumber();
}

const sendDelete = async (comment, commentIdx) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/commentDelete`,
        method: "POST",
        data: {
            commentIdx
        }
    });
    // 성공하면 현재 화면에 댓글 추가
    if (response.status === 200) {
        deleteComment(comment);
    }
}

// eslint-disable-next-line import/prefer-default-export
export const handleDelete = (event) => {
    const comment = event.target.parentElement;
    const commentIdx = Array.prototype.indexOf.call(commentList.childNodes, comment);
    sendDelete(comment, commentIdx);
}


function init() {
    commentList.childNodes.forEach (comment => {
        const deleteButton = comment.querySelector("#jsDeleteComment");
        if (deleteButton) {
            deleteButton.addEventListener("click", handleDelete);
        }
    })
}

if (commentList) {
    init();
}