var allEmployees = [];

// ── Load all employees from backend ──────────────────────────────────────────
function loadEmployees() {
    showState('loading');

    $.ajax({
        url     : 'http://localhost:8080/api/employees',
        type    : 'GET',
        success : function(data) {
            allEmployees = data;
            $('#totalCount').text(data.length);
            renderTable(data);
        },
        error   : function(xhr) {
            var msg = xhr.responseJSON?.message || 'Could not connect to the server. Make sure Spring Boot is running on port 8080.';
            $('#errorMsg').text(msg);
            showState('error');
        }
    });
}

// ── Render rows into table ────────────────────────────────────────────────────
function renderTable(employees) {
    if (employees.length === 0) {
        showState('empty');
        return;
    }

    var rows = '';
    $.each(employees, function(i, emp) {
        var initials = getInitials(emp.firstName, emp.lastName);
        rows += '<tr id="row-' + emp.id + '">'
            + '<td><span class="id-badge">#' + emp.id + '</span></td>'
            + '<td><div class="name-cell">'
            +       '<div class="avatar">' + initials + '</div>'
            +       '<span class="name-text">' + emp.firstName + ' ' + emp.lastName + '</span>'
            + '</div></td>'
            + '<td><span class="email-text">' + emp.email + '</span></td>'
            + '<td><div class="actions-cell">'
            +   '<button class="btn-icon" title="Edit" onclick="editEmployee(' + emp.id + ')">✎</button>'
            +   '<button class="btn-icon danger" title="Delete" onclick="deleteEmployee(' + emp.id + ', \'' + emp.firstName + ' ' + emp.lastName + '\')">✕</button>'
            + '</div></td>'
            + '</tr>';
    });

    $('#empTableBody').html(rows);
    $('#showingCount').text(employees.length);
    showState('table');
}

// ── Search / filter (client-side, no extra backend call) ─────────────────────
$('#searchInput').on('input', function() {
    var term = $(this).val().toLowerCase().trim();
    if (term === '') {
        renderTable(allEmployees);
        return;
    }
    var filtered = allEmployees.filter(function(emp) {
        return (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(term)
            || emp.email.toLowerCase().includes(term);
    });
    renderTable(filtered);
});

// ── Delete employee ───────────────────────────────────────────────────────────
function deleteEmployee(id, name) {
    if (!confirm('Delete "' + name + '"? This cannot be undone.')) return;

    $.ajax({
        url  : 'http://localhost:8080/api/employees/' + id,
        type : 'DELETE',
        success : function() {
            // Remove from local array and re-render (no extra GET call needed)
            allEmployees = allEmployees.filter(function(e) { return e.id !== id; });
            $('#totalCount').text(allEmployees.length);
            renderTable(allEmployees);
            showToast('Employee "' + name + '" deleted.', 'success');
        },
        error : function(xhr) {
            var msg = xhr.responseJSON?.message || 'Delete failed.';
            showToast(msg, 'error');
        }
    });
}

// ── Edit — redirect to update page with ID in URL ────────────────────────────
function editEmployee(id) {
    window.location.href = '/html/update-employee.html?id=' + id;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(first, last) {
    return ((first || '').charAt(0) + (last || '').charAt(0)).toUpperCase();
}

function showState(state) {
    $('#loadingState, #emptyState, #errorState').hide();
    $('#empTable').hide();

    if (state === 'loading') { $('#loadingState').show(); }
    else if (state === 'empty')   { $('#emptyState').show(); }
    else if (state === 'error')   { $('#errorState').show(); }
    else if (state === 'table')   { $('#empTable').show(); }
}

function showToast(message, type) {
    var $t = $('#toast');
    $t.text(message).removeClass('success error').addClass(type + ' show');
    setTimeout(function() { $t.removeClass('show'); }, 3000);
}

// ── Run on page load ──────────────────────────────────────────────────────────
$(document).ready(function() {
    loadEmployees();
});
