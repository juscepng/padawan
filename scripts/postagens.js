async function load() {
   url = 'https://jsonplaceholder.typicode.com/posts';

    const result = await fetch(url, {
        method: 'GET'
    });

    const resultJson = await result.json();

    const slice = resultJson.slice(0,10);

    const list = [];

    for (const slices of slice){
        list.push(
            templateList({
                title: slices.title,
                body: slices.body
            })
        );
    }

    list.forEach(table => {
        $('#tbody').append(table);
    });

}

$(async function () {
    load()
});

function templateList({
    title,
    body
}){
    return `
    <tr>
        <td>${title}</td>
        <td>${body}</td>
    </tr>
    `;
}