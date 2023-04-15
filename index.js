var token = "90932826|-31949281551041388|90948217";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
resetForm();
function validateAndGetFormData() {
    var rollnoVar = $("#rollno").val();

    if (rollnoVar === "") {
        alert("Roll No is required");
        $("#rollno").focus();
        return "";
    }

    var nameVar = $("#name").val();
    if (nameVar === "") {
        alert("Student Name is required");
        $("#name").focus();
        return "";
    }

    var classed = $("#class").val();
    if (classed === "") {
        alert("Class is required");
        $("#class").focus();
        return "";
    }

    var address = $("#address").val();
    if (address === "") {
        alert("Address is required");
        $("#address").focus();
        return "";
    }

    var BirthDate = $("#BirthDate").val();
    if (BirthDate === "") {
        alert("Birth-Date is required");
        $("#BirthDate").focus();
        return "";
    }

    var EnrollmentDate = $("#EnrollmentDate").val();
    if (EnrollmentDate === "") {
        alert("Enrollment-Date is required");
        $("#EnrollmentDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollno: rollnoVar,
        name: nameVar,
        class: classed,
        address: address,
        BirthDate: BirthDate,
        EnrollmentDate: EnrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}

function updateStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status === 200) {
        alert("Data Updated Successfully");
    }
    else if (resultObj.status === 401) {
        alert("Invalid Token");
    }
    else if (resultObj.status === 400) {
        alert("Something Went Wrong");
    }
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

function savetolocalstorage(resultObj) {
    var data = JSON.parse(resultObj.data);
    localStorage.setItem('rec_no', data.rec_no);
}

function resetForm() {
    $("#rollno").val("");
    $("#name").val("").prop("disabled", true);
    $("#class").val("").prop("disabled", true);
    $("#address").val("").prop("disabled", true);
    $("#BirthDate").val("").prop("disabled", true);
    $("#EnrollmentDate").val("").prop("disabled", true);
    $("#rollno").prop("disabled", false);
    $("#savebutton").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}

function enableInput() {
    $("#name").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#BirthDate").prop("disabled", false);
    $("#EnrollmentDate").prop("disabled", false);
    $("#reset").prop("disabled", false);

}

document.getElementById("rollno").addEventListener("focusout", function (event) {
    var result = checkRecord();
});

function checkRecord() {
    var rollnoVar = $("#rollno").val();
    if (rollnoVar === "") {
        alert("Student Roll No is required");
        $("#name").focus();
        return "";
    }

    var jsonObj = {
        rollno: rollnoVar
    };
    var jsonStr = JSON.stringify(jsonObj);
    if (jsonStr === "") {
        return;
    }
    var getReqStr = createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
    if (resultObj.status !==200) {
        $("#savebutton").prop("disabled", false);
        enableInput();
    }
    else{
        $("#savebutton").prop("disabled", true);
        fillData(resultObj);
        return true;
    }
}

function fillData(resultObj) {
    var data = JSON.parse(resultObj.data);
    var data1 = JSON.stringify(data.record);
    var data2 = JSON.parse(data1);
    $("#rollno").val(data2.rollno);
    $("#name").val(data2.name);

    $("#class").val(data2.class);
    $("#address").val(data2.address);
    $("#BirthDate").val(data2.BirthDate);
    $("#EnrollmentDate").val(data2.EnrollmentDate);
    jQuery.ajaxSetup({ async: true });
    savetolocalstorage(resultObj);
    $("#rollno").prop("disabled", true);
    $("#savebutton").prop("disabled", true);
    $("#rollno").prop("disabled", true);
    $("#update").prop("disabled", false);

    enableInput();
}

function registerStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status === 200) {
        alert("Data Added Successfully");
    }
    else if (resultObj.status === 401) {
        alert("Invalid Token");
    }
    else if (resultObj.status === 400) {
        alert("Something Went Wrong");
    }
    jQuery.ajaxSetup({ async: true });
    resetForm();
}
