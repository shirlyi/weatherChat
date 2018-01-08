

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cityWheaterData));
  }
  
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

var fetch = function (city) {
    $.ajax({
        method: "GET",
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d703871f861842b79c60988ccf3b17ec',
        success: function (data) {
            console.log(data);
            saveTemp(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

function rendeResult() {
    cityWheaterData=getFromLocalStorage();
    // refresh++
    // if(refresh==1){ 
    // }
    //console.log(localStorage.getItem(STORAGE_ID));
    var source = $('#post-item').html();
    var template = Handlebars.compile(source);
    $(".search-result").empty();
    for (var i = 0; i < cityWheaterData.length; i++) {
        var newHTML = template(cityWheaterData[i]);
        $('.search-result').append(newHTML);
    }
}

function saveTemp(data) {
    var temp = data.main.temp;
    var index = findindex(data.name);
    if (index === null) {
        cityWheaterData.push({ name: data.name, tempc: (temp - 273).toFixed(2), tempf: ((temp + 459.67) * (5 / 9)).toFixed(2), date: Date(), comments: [] });
    }
    else {
        updateWheather(index,data);
    }
    console.log(cityWheaterData);
    saveToLocalStorage();
    rendeResult();
}

function updateWheather(index,data) {
    cityWheaterData[index].tempc = (data.main.temp - 273).toFixed(2);
    cityWheaterData[index].tempf = ((data.main.temp + 459.67) * (5 / 9)).toFixed(2)
    cityWheaterData[index].date = Date();
}

function findindex(name) {
    var index = null;
    for (var i = 0; i < cityWheaterData.length; i++) {
        if (cityWheaterData[i].name === name) {
            index = i;
        }
    }
    return index;
}


$(".search-result").on('click', ".comment-btn", function () {
    var commentContent = $(this).siblings(".enter-comment").val();
    var closetempdiv = $(this).parents('.temp-div').data().name;
    var index = findindex(closetempdiv);
    cityWheaterData[index].comments.push(commentContent);
    saveToLocalStorage();
    rendeResult();
})

$(".search").click(function () {
    var index = findindex($("#city-name").val());
    fetch($("#city-name").val());
});

$(".search-result").on('click', ".deletlogo", function () {
    var closetempdiv = $(this).parents('.temp-div').data().name;
    var index = findindex(closetempdiv);
    cityWheaterData.splice(index, 1);
    saveToLocalStorage();
    rendeResult();
})
var STORAGE_ID = 'wheaterchat';
var cityWheaterData = [];
rendeResult();
//{ name: '', tempc: '', tempf: '', date: '', commensts: [],}

