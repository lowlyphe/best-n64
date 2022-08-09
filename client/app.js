const $game1 = $('.game1');
const $name1 = $('.title1');
const $year1 = $('.year1');
const $publisher1 = $('.publisher1');
const $game2 = $('.game2');
const $name2 = $('.title2');
const $year2 = $('.year2');
const $publisher2 = $('.publisher2');




const getGame = () => {
    $.get('/api/games', (data) => {
        let { id, name, path, publisher, year } = data[0];
        $name1.text(name);
        $game1.attr('src', path);
        $publisher1.text(publisher);
        $year1.text(year);
        let name2 = data[1].name;
        let path2 = data[1].path;
        let publisher2 = data[1].publisher;
        let year2 = data[1].year;
        $name2.text(name2);
        $game2.attr('src', path2);
        $publisher2.text(publisher2);
        $year2.text(year2);

    })
}



$(document).ready(() => {
    getGame();
    
})

$(window).on('load', () => {
    
})

function newW()
{
    $('#cover').fadeOut(200)
}
setTimeout(newW, 2000);



$game1.click(() => {
    let path = $game1.attr('src')
    $.ajax({
        type: 'PATCH',
        url: "/api/games",
        data: JSON.stringify({"path": path}),
        success: res=> console.log(res),
        contentType: "application/json"
    })
    getGame();
})

$game2.click(() => {
    let path = $game2.attr('src')
    $.ajax({
        type: 'PATCH',
        url: "/api/games",
        data: JSON.stringify({"path": path}),
        success: res=> console.log(res),
        contentType: "application/json"
    })
    getGame();
})