function updateCardIcon () {
    var icon = document.querySelectorAll("img.header-card")[0];
    var localStorage = allStorage();
    var c = 0;
    localStorage.forEach((element) => {
        c++
    });
    if (c > 0)
        icon.src = "file/icon-card-active.svg";
    else 
        icon.src = "file/icon-card.svg";
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}