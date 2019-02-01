function serverURL() {
    return "https://techtrek-api-gateway.cfapps.io/"; // here to change DB
}


function doAJAXCall(partialLink, dataToSend, callback, callbackFailed) {

    var url = serverURL() + partialLink;
    var headers = {
        'identity': 'O4',
        'token': 'aa9a045b-4279-4d49-b099-d322a2eaecac'
    };
    var data = dataToSend;
    $.ajax({
        url: url,
        beforeSend: function (request) {
            request.setRequestHeader("identity", "O2");
            request.setRequestHeader("token", "545a6a5f-f955-48c1-936b-d545eac1aee8");
        },
        type: 'GET',
        data: data,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            callback(arr);
            return "Success";
        },
        error: function (arr) {
            callbackFailed(arr);
            return "Failed";
        }
    });

}

function isWholeNumber(value) {
    if (value % 1 === 0) {
        return true;
    } else {
        return false;
    }
}