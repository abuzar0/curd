
$(document).ready(function () {
    console.log('ok kro...');
    fetch('http://localhost:3000/getAll')
        .then(response => response.json())
        .then(data => loadhtml(data));




        $('#search').on('click', function () {
            const id = $('#s_name').val();
            console.log(id);
            fetch('http://localhost:3000/search/' + id + '')
            .then(response => response.json())
            .then(data => searchloadhtml(data));
        });

    $('#submit').on('click', function () {
        l_name = $('#l_name').val();
        email = $('#mail').val();
        password = $('#password').val();
        const DATA = { l_name, email, password };
        fetch('http://localhost:3000/Insert', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(DATA)
        });
        alert(' 1 Record Is Added ...');
        $('#l_name').val(null);
        $('#mail').val(null);
        $('#password').val(null);

        fetch('http://localhost:3000/getAll')
            .then(response => response.json())
            .then(data => loadhtml(data));
    });
});
    function searchloadhtml(data) {
        console.log(data.result.length);
        table = document.querySelector('table tbody');
        if (data.result.length > 0) {
            let tabelhtml = "<tr>";
            for (i = 0; i < data.result.length; i++) {
                tabelhtml += `<td>${data.result[i].id}</td>`;
                tabelhtml += `<td>${data.result[i].name}</td>`;
                tabelhtml += `<td>${data.result[i].email}</td>`;
                tabelhtml += `<td>${data.result[i].password}</td>`;
                tabelhtml += '<td> <button onclick=+Delete(this)>Delete</button></td>'
                tabelhtml +='<td><button  onclick=+update(this)>Update</button></td>'
                tabelhtml += "</tr>";
            }
            table.innerHTML = tabelhtml;
        }
        else {
            table.innerHTML = "<tr><td class='no-data' colspan='6'><b>No Data Found</b></td></tr>";
        }
    }
    function update(ctl) {
        document.getElementById("update").hidden = false;
        document.getElementById("pop").hidden = true;
        var id = $(ctl).parents("tr").children('td:eq(0)').text();
        var name = $(ctl).parents("tr").children('td:eq(1)').text();
        var mail = $(ctl).parents("tr").children('td:eq(2)').text();
        var password = $(ctl).parents("tr").children('td:eq(3)').text();

        u_name=$('#u_name').val(name);
        u_mail=$('#u_mail').val(mail);
        u_password=$('#u_password').val(password);
        $('#update_data').on('click',function () {
               new_name=u_name.val();
               new_mail=u_mail.val();
               new_password=u_password.val();
            const DATA = {id,new_name, new_mail, new_password };
          fetch('http://localhost:3000/update', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DATA)
        });
        alert(' 1 Record Is Added ...');
        document.getElementById("update").hidden = true;
        document.getElementById("pop").hidden = false;
        reload();
    }
)}

function loadhtml(data) {
    console.log(data);
    table = document.querySelector('table tbody');
    if (data.result.length > 0) {
        let tabelhtml = "<tr>";
        for (i = 0; i < data.result.length; i++) {
            tabelhtml += `<td>${data.result[i].id}</td>`;
            tabelhtml += `<td>${data.result[i].name}</td>`;
            tabelhtml += `<td>${data.result[i].email}</td>`;
            tabelhtml += `<td>${data.result[i].password}</td>`;
            tabelhtml += '<td> <button onclick=+Delete(this)>Delete</button></td>'
            tabelhtml +='<td><button  onclick=+update(this)>Update</button></td>'
            tabelhtml += "</tr>";
        }
        table.innerHTML = tabelhtml;
    }
    else {
        table.innerHTML = "<tr><td class='no-data' colspan='5'><b>No Data</b></td></tr>";
    }
}
function Delete(ctl) {
    var id = $(ctl).parents("tr").children('td:eq(0)').text();
    alert('Record Is Dleted .....');
    fetch('http://localhost:3000/delete/' + id + '', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(reload());

}
function reload(){

    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadhtml(data));
}