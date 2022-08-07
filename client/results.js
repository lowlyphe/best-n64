const $results = $('.results')


$(document).ready(() => {
    $.get('/api/results', (data) => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let name = data[i].name;
            let publisher = data[i].publisher;
            let year = data[i].year;
            let path = data[i].path;
            let rating = data[i].rating;
            $('#table tr:last').after(`
            <tr>
            <td class="border border-solid border-white-200 text-center">
            ${name}
            </td>
            <td class="border border-solid border-white-200 text-center">
            ${publisher}
            </td>
            <td class="border border-solid border-white-200 text-center">
            ${year}
            </td>
            <td class="hidden md:block overflow-hidden border border-solid border-white-200"">
            <img class="-rotate-90 w-48 mt-12 mx-auto" src=${path} alt=${name}/>
            </td>
            <td class="border border-solid border-white-200 text-center">
            ${rating}
            </td>
            </tr>
            `).appendTo('#table')
           
            
        }
    })
})