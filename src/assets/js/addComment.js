import axios from "axios";

import { handleDelete } from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

// 댓글 추가 (realtime, fake)
const addComment = comment => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    // 댓글
    span.innerHTML = comment;
    // 삭제 버튼
    i.classList.add("fas");
    i.classList.add("fa-times-circle");
    i.addEventListener("click", handleDelete);
    
    li.appendChild(span);
    li.appendChild(i);
    commentList.prepend(li);
    increaseNumber();
};

// 댓글 저장 api 호출
const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    // 성공하면 현재 화면에 댓글 추가
    if (response.status === 200) {
        addComment(comment);
    }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}