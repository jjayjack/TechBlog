// const { response } = require("express");

//create new post
const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-content').value.trim();
    const description = document.querySelector('#content').value.trim();

    const response = await fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to post')
    }
}

document.querySelector('.post-form').addEventListener('submit', postFormHandler);

