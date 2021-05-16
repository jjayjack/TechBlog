
const editPost = async(event) =>{
    event.preventDefault();
    const id = event.target.dataset.id
    const title = document.querySelector('#title-content').value.trim();
    const description = document.querySelector('#content').value.trim();

    const edit = await fetch('/posts/'+ id, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json'}
    });
    if (edit.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to edit')
    }
}

document.querySelector('.post-form').addEventListener('submit', editPost);
