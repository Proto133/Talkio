const subPost = document.querySelector('#addPost');
async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea').value;
    // const post_content = document.querySelector('#post-content').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
subPost.addEventListener('click', newFormHandler);