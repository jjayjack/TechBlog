// edits select post
const editPrevPost = async(event)=> {
    event.preventDefault();
    const id = event.target.dataset.id
    
    document.location.replace('/dashboard/' + id)  
}
document.querySelector('.editBtn').addEventListener('click', editPrevPost);

//deletes previous post
const deletePrevPost = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.id

    fetch('/posts/' + id, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
}
// Event listener for delete button
document.querySelector('.deleteBtn').addEventListener('click', deletePrevPost);