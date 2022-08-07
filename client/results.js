const $results = $('.results')


$(document).ready(() => {
    $.get('/api/results', (data) => {
        let $resultList = $('<table></table>').addClass('flex space-x-6 border border-solid border-white-200 text-white justify-between').html(`
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Publisher</th>
                    <th>Year</th>
                    <th>Box Art</th>
                    <th>Rating</th>
                </tr>
              </thead body>
              <tbody>
              </tbody>

            `).appendTo($results)
        for (let i = 0; i < data.length; i++) {
            let name = data[i].name;
            let publisher = data[i].publisher;
            let year = data[i].year;
            let path = data[i].path;
            let rating = data[i].rating;
            $('<tr></tr>').html(`
            <td>
            ${name}
            </td>
            <td>
            ${publisher}
            </td>
            <td>
            ${year}
            </td>
            <td class="overflow-hidden">
            <img class="-rotate-90 w-48 mt-48" src=${path} alt=${name}/>
            </td>
            <td>
            ${rating}
            </td>
            `)
            
        }
    })
})