
const commentFormHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    const comment = document.querySelector('#comment').value.trim();

    const response = await fetch('/posts/' + id +'/comment', {
        method: 'POST',
        body: JSON.stringify({description:comment}),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.reload();;
        console.log('commented', response);
    }else {
        alert('Unable to comment')
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);