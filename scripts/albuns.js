async function load() {
    url = 'https://jsonplaceholder.typicode.com/albums';
 
    const result = await fetch(url, {
        method: 'GET'
    });
 
    const resultJson = await result.json();
 
    const slice = resultJson.slice(0,10);
 
    const list = [];

    for (const slices of slice){
       const photo = await loadPhoto(slices.id);
       console.log(slices.id);
        list.push(
            templateList({
                title: slices.title,
                listPhoto: photo
            })
        );
    }
 
    list.forEach(table => {
        $('#tbody').append(table);
    });
}

async function loadPhoto(idAlbum){
    url = 'https://jsonplaceholder.typicode.com/albums/'+idAlbum+'/photos';
    const resultPhoto = await fetch(url, {
        method: 'GET'
    });

    const resultPjson = await resultPhoto.json();
    const slicePhoto = resultPjson.slice(0, 1);

    let listPhoto = ``;

    for (const slicesPhoto of slicePhoto){
        const urlPhoto = templatePhoto(
            {
                urlPhoto: slicesPhoto.url
            }
        );
        listPhoto += urlPhoto;
    }

    return new Promise((resolve) => {
        resolve(listPhoto);
    });
}

$(async function () {
    load()
});
 
function templateList({
   title,
   listPhoto
}){
    return `
    <tr>
        <td>${title}</td>
        <td>${listPhoto}</td>
    </tr>
    `;
}

function templatePhoto({
    urlPhoto
}){
    return`
    <img src="${urlPhoto}">
    `
}
