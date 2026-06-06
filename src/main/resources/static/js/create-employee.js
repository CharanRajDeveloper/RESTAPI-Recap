function createEmployee() {
    debugger;
    const employeeData = {
        firstName : $('#firstName').val().trim(),
        lastName  : $('#lastName').val().trim(),
        email     : $('#email').val().trim()
    };

    $.ajax({
        url         : 'http://localhost:8080/api/employees',
        type        : 'POST',
        contentType : 'application/json',
        data        : JSON.stringify(employeeData),
        success     : function(data) { showSuccess(data); },
        error       : function(xhr)  { showError(xhr.responseJSON?.message || 'Request failed'); }
    });
}
function showSuccess(data) {
    $('#msg')
        .removeClass('error')
        .addClass('success')
        .text('Employee "' + data.firstName + ' ' + data.lastName + '" created! ID: ' + data.id);
}

function showError(message) {
    $('#msg')
        .removeClass('success')
        .addClass('error')
        .text('Error: ' + message);
}