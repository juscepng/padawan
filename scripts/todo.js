async function load() {
    url = 'https://jsonplaceholder.typicode.com/users';
 
    const result = await fetch(url, {
        method: 'GET'
    });
 
    const resultJson = await result.json();
 
    const slice = resultJson.slice(0,10);
 
    const list = [];
 
    for (const slices of slice){
        const listComent = await loadTodo(slices.id);
        list.push(
            templateList({
                name: slices.name,
                username: slices.username,
                email: slices.email,
                titleComent: listComent
            })
        );
    }
 
    list.forEach(table => {
        $('#tbody').append(table);
    });

}

async function loadTodo(userId) {
    url = 'https://jsonplaceholder.typicode.com/users/'+userId+'/todos';
    
    const resultComent = await fetch(url, {
        method: 'GET'
    });

    const jsonComent = await resultComent.json();

    const sliceComent = jsonComent.slice(0, 10);

    let listComent = ``;

    for (const slicesComent of sliceComent){
        const titleComent = templateComent(
            {
            titleComent: slicesComent.title
            }
        );

        listComent += titleComent;
    }

    return new Promise((resolve) => {
        resolve(listComent);
    });
}

$(async function () {
    load()
});
 
function templateList({
    username,
    name,
    email,
    titleComent
}){
    return `
    <tr>
        <td>${username}</td>
        <td>
            <p>${name}</p>
            <p>${email}</p>
        </td>
        <td>${titleComent}</td>
    </tr>
    `;
}

function templateComent({
    titleComent
}){
    return`
    <p class="paragrafo">${titleComent}</p>
    <hr>
    `
}
