const postId = document.getElementById("postId").value;

async function modifyPost(postId) {
  const password = prompt("패스워드를 입력해주세요.");

  if (password === "") {
    return;
  }

  const result = await fetch("/check-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: postId, password: password }),
  });

  const data = await result.json();
  if (data.isExist) {
    document.location = `/modify/${postId}`;
  } else {
    alert("패스워드가 올바르지 않습니다.");
  }
}

async function deletePost(postId) {
  const password = prompt("패스워드를 입력해주세요.");
  console.log(password);

  if (password === "") {
    return;
  }

  const result = await fetch(`/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  });

  const data = await result.json();
  if (!data.isSuccess) {
    alert("패스워드가 올바르지 않습니다.");
    return;
  }

  document.location = "/";
}

async function deleteComment(commentId) {
  const password = prompt("패스워드를 입력해주세요.");
  if (password === "") {
    return;
  }

  const result = await fetch(`/comment/${postId}/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  });

  const data = await result.json();
  if (!data.isSuccess) {
    alert("패스워드가 올바르지 않습니다.");
    return;
  }

  document.location = `/detail/${postId}`;
}
