newUsr = "yes";
ActiveCountryDetails = null;
ModalTab = "Details";
MeasureLabel = "Lack of Financial Development";
ChosenMeasure = "FinInc";


function windowNewUserFunc() {
    // console.log    Running: windowNewUserFunct");
    if (newUsr === "yes") {
        if (document.location.hash === "") {
            document.location.hash = "/?/Home";
        }
        hashUrlFunc();
        newUsr = "no";
    } else {
        hashUrlFunc();
    }
}






function hashUrlFunc() {
    // console.log("`    Running: hashUrlFunc");
    //Retrieves URL and parses it into the array
    pageurl = document.URL;
    //console.log("hashUrlFunc was run")
    var HashRawData = pageurl.substring(pageurl.lastIndexOf('#/?/') + 4); //places data to parse into "HashRawData"
    HashDataArray = HashRawData.split("/?/");
    lableHashArrayFunc();
}

/*
function lableHashArrayFunc
    - lables the URL data retrieved from "hashRrlFunc" and then calls "changePageProxyFunc"
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
*/
function lableHashArrayFunc() {
    // console.log("`    Running: labelHashArrayFunc");
    //console.log("lableHashArrayFunc");

    //assigning parsed data to vars
    if (HashDataArray[0] != null) {
        WebView = HashDataArray[0];
        // WebView is the active view/modal
        //options are:
        //Home
        //Details
        if (HashDataArray[1] != null) {
            ModalTab = null;
            //ActiveCountryDetails is the active country for the details modal view 
            //ActiveCountryDetails is the value of clicking on a country
            PageRequested = HashDataArray[1];
            if (WebView === "Details") {
                ActiveCountryDetails = PageRequested;
                //console.log(PageRequested);
            }
            if (WebView === "Home") {
                ChosenMeasure = PageRequested;
                //console.log(PageRequested);
            }

            //console.log(WebView);
            if (HashDataArray[2] != null) {
                ModalTab = HashDataArray[2];
                //ModalTab is the chosen simulation/view for the popup modal
                //options are
                //Overview
                //Simulation
                //Comparison

                if (HashDataArray[3] != null) {
                    MeasureLabel = HashDataArray[3];
                    /*//console.log(NAMEmE1);

                    if (HashDataArray[4] != null) {
                        NAMEmE2 = HashDataArray[4];
                        //console.log(NAMEmE2);
                    } else {
                        delete HashDataArray[4];
                        NAMEmE2 = "null";
                    }*/
                } else {
                    delete HashDataArray[3];
                    MeasureLabel = "null";
                }
            } else {
                delete HashDataArray[2];
                ModalTab = "null";
            }
        } else {
            delete HashDataArray[1];
            PageRequested = "null";
        }
    } else {
        delete HashDataArray[0];
        WebView = "null";
    }
    changePageProxyFunc();
}



function changeURLFunc(actionSource) {
    if (actionSource === "Home") {
        WebView === "Home";
        document.location.hash = "/?/Home/?/" + ChosenMeasure + "/?/" + "/?/Details/?/" + MeasureLabel;
    }
    if (actionSource === "Details") {
        WebView === "Details";
        document.location.hash = "/?/Details/?/" + ActiveCountryDetails;
    }

}


function changePageProxyFunc() {
    // console.log    Running: changePageProxyFunc");
    if (WebView === "Details") {
        //  this method should call a function to hide the modal view - needs renaming
        //triggers the displayCountryInfo Modal
        //"ActiveCountryDetails" === icat_js.js "clickedCountry"
        displayCountryInfo(ActiveCountryDetails);
    }
    if (WebView === "Home") {
        //triggers a click on the country id desired passing the value
        if (ChosenMeasure != null) {
            if (MeasureLabel != null) {
                //"(ChosenMeasure, MeasureLabel" === ""clickedId, measureLabel)"
                drawRegionsMap(ChosenMeasure, MeasureLabel);
            }
        }
    }
}