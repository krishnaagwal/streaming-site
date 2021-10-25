var jsonFilePath = "data.json";
var processedData = [];
var jsonData;

let request = new XMLHttpRequest();
request.open("GET", jsonFilePath);
request.responseType = "json";
request.send();
request.onload = function () {
    jsonData = request.response;
    displayUnfilteredData();
};

function displayUnfilteredData() {
    for (i = 0; i < jsonData.items.length; i++) {
        processedData.push(jsonData.items[i]);
        var vidPath = jsonData.items[i].videoPath;
        var imgPath = jsonData.items[i].imgPath;
        var price = jsonData.items[i].price;
        var discription = jsonData.items[i].description;

        var itemCard = createCard(vidPath, imgPath, price, discription);

        document.getElementById("dataDiv").innerHTML += itemCard;
    }
}

function createCard(vidPath, imgPath, price, desc) {
    var card =
        '<div class="col-3 row1" style="margin-top: 10px; margin-bottom: 10px">' +
        '<div class="card" style="width: 100%; height: 100%">' +
        "<img src=" +
        imgPath +
        ' class="card-img-top" alt="..."  style=" height: 70%" />' +
        '<div class="card-body">' +
        '<h5 class="card-title">' +
        price +
        "</h5>" +
        '<p class="card-text">' +
        desc +
        "</p>" +
        `<a href="#" onclick="playVideo('${vidPath}', 'html_contents', 'PlayVideo', 'location=1,status=1,toolbar=1,scrollbars=1,resizeable=1,width=500,height=25');" class="btn btn-primary" >Watch</a>` +
        "</div>" +
        "</div>" +
        "</div>";
    return card;
}

/* <a href="#" onclick="open_in_new_window('html_contents', 'MyTitle', 'location=1,status=1,toolbar=1,scrollbars=1,resizeable=1,width=500,height=250');">Open New Window</a> */


function playVideo(vidPath, htmlId, new_page_title, features) {
    var new_window;

    if (features !== undefined && features !== '') {
        document.getElementById("vidLink").src = vidPath;
        new_window = window.open('', '_blank', features);
    }
    else {
        new_window = window.open('', '_blank');
    }

    var html_contents = document.getElementById(htmlId);
    if (html_contents !== null) {
        new_window.document.write('<!doctype html><html><head><title>' + new_page_title + '</title><meta charset="UTF-8" /></head><body>' + html_contents.innerHTML + '</body></html>');
    }
}



function getFilteredData() {
    var selectedBrands = [];

    //  var maleGender = document.getElementById("flexRadioMale");
    var maleGenderVal = document.getElementById("flexRadioMale").checked
        ? document.getElementById("flexRadioMale").value
        : "";
    var femaleGenderVal = document.getElementById("flexRadioFemale").checked
        ? document.getElementById("flexRadioFemale").value
        : "";
    //  var femaleGender = document.getElementById("flexRadioFemale");
    document.getElementById("flexCheckAction").checked
        ? selectedBrands.push(document.getElementById("flexCheckAction").value)
        : "";
    document.getElementById("flexCheckDrama").checked
        ? selectedBrands.push(document.getElementById("flexCheckDrama").value)
        : "";
    document.getElementById("flexCheckComedy").checked
        ? selectedBrands.push(document.getElementById("flexCheckComedy").value)
        : "";
    document.getElementById("flexCheckRomance").checked
        ? selectedBrands.push(document.getElementById("flexCheckRomance").value)
        : "";
    document.getElementById("flexCheckSciFi").checked
        ? selectedBrands.push(document.getElementById("flexCheckSciFi").value)
        : "";
    var catVal = document.getElementById("selectCatogory").value;

    document.getElementById("dataDiv").innerHTML = "";
    var filteredArray = [];

    for (i = 0; i < jsonData.items.length; i++) {
        if (maleGenderVal == femaleGenderVal || (maleGenderVal == jsonData.items[i].gender)) {
            if (catVal == "select catogory" || catVal == jsonData.items[i].category) {
                if (selectedBrands.length == 0 || selectedBrands.includes(jsonData.items[i].brand)) {
                    filteredArray.push(jsonData.items[i]);
                    var itemCard = createCard(jsonData.items[i].videoPath, jsonData.items[i].imgPath, jsonData.items[i].price, jsonData.items[i].description);
                    document.getElementById("dataDiv").innerHTML += itemCard;
                }
            }
        }
        else if (maleGenderVal == femaleGenderVal || (femaleGenderVal == jsonData.items[i].gender)) {
            if (catVal == "select catogory" || catVal == jsonData.items[i].category) {
                if (selectedBrands.length == 0 || selectedBrands.includes(jsonData.items[i].brand)) {
                    filteredArray.push(jsonData.items[i]);
                    var itemCard = createCard(jsonData.items[i].videoPath, jsonData.items[i].imgPath, jsonData.items[i].price, jsonData.items[i].description);
                    document.getElementById("dataDiv").innerHTML += itemCard;
                }
            }
        }
    }
    console.log(filteredArray);
    processedData = filteredArray;
}

function getTrendingData() {
    document.getElementById("dataDiv").innerHTML = "";
    for (i = 0; i < processedData.length; i++) {
        if (processedData[i].trending == true) {
            var itemCard = createCard(jsonData.items[i].videoPath, jsonData.items[i].imgPath, jsonData.items[i].price, jsonData.items[i].description);
            document.getElementById("dataDiv").innerHTML += itemCard;
        }
    }
}

function getWhatsNewData() {
    document.getElementById("dataDiv").innerHTML = "";
    for (i = 0; i < processedData.length; i++) {
        if (processedData[i].new == true) {
            var itemCard = createCard(jsonData.items[i].videoPath, jsonData.items[i].imgPath, jsonData.items[i].price, jsonData.items[i].description);
            document.getElementById("dataDiv").innerHTML += itemCard;
        }
    }
}

function getSortByPriceData(clicked_id) {
    document.getElementById("dataDiv").innerHTML = "";

    const sortArray = processedData;
    sortArray.sort((a, b) => {
        if (a.price < b.price) {
            if (clicked_id == "lowtohigh") {
                return -1;
            } else {
                return 1;
            }
        } else if (b.price < a.price) {
            if (clicked_id == "lowtohigh") {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    });
    // processedData = sortArray;
    for (i = 0; i < sortArray.length; i++) {
        var itemCard = createCard(sortArray[i].videoPath, sortArray[i].imgPath, sortArray[i].price, sortArray[i].description);
        document.getElementById("dataDiv").innerHTML += itemCard;
    }
}

function getSortByPopularityData(clicked_id) {
    document.getElementById("dataDiv").innerHTML = "";

    const sortArray = processedData;
    sortArray.sort((a, b) => {
        if (a.popularityIndex < b.popularityIndex) {
            if (clicked_id == "lowtohighpop") {
                return -1;
            } else {
                return 1;
            }
        } else if (b.popularityIndex < a.popularityIndex) {
            if (clicked_id == "lowtohighpop") {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    });
    //processedData = sortArray;
    for (i = 0; i < sortArray.length; i++) {
        var itemCard = createCard(sortArray[i].videoPath, sortArray[i].imgPath, sortArray[i].price, sortArray[i].description);
        document.getElementById("dataDiv").innerHTML += itemCard;
    }
}