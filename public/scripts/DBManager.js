function extractDBData(url) {
    var txtFile = new XMLHttpRequest();
    var parsedD = null;

    txtFile.open("GET", url, false);
    txtFile.onload = function (e) {
        if (txtFile.readyState === 4) {
            if (txtFile.status === 200) {
                var csvData = txtFile.responseText;

                parsedD = csvData;
            } else {
                console.error(txtFile.statusText);
            }
        }
    };
    txtFile.onerror = function (e) {
        console.error(txtFile.statusText);
    };

    txtFile.send();

    return JSON.parse(parsedD);
}
