const url = "http://localhost/server/server/public/index.php/school";

const getSchools = () => {
    $.ajax({
        method: "GET",
        url: url
    }).done(function (res) {
        content = "";
        res = res.listSchools
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].name}</td>
                            <td>${res[i].street}</td>
                            <td>${res[i].created.date}</td>
                            <td>${res[i].updated.date}</td>
                            <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                            <td>
                                <button type="button" onclick="getSchoolById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modalModify" class="btn btn-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteSchool(${res[i].id})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table > tbody").html(content);

    });
};

const getSchoolById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url + '/' + id
    }).done(res =>{
        document.getElementById("street1").value = res.school[0].street;
        document.getElementById("status1").value = res.school[0].status;
        document.getElementById("name1").value = res.school[0].name;
        document.getElementById("id1").value =res.school[0].id;
    });
};

const createSchool = async() => {
    let school = new Object();
    school.name = document.getElementById("name").value;
    school.street = document.getElementById("street").value;
    school.status = document.getElementById("status").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/create',
        data: school
    }).done(res => {
        console.log(res);
        Swal.fire({
            title: 'The school has been registered',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getSchools();
                document.getElementById("street").value = "";
                document.getElementById("status").value = "";
                document.getElementById("name").value = "";
            }
        })
    });
}

const updateSchool = async() =>{
    let school = new Object();
    school.id = document.getElementById("id1").value;
    school.name = document.getElementById("name1").value;
    school.street = document.getElementById("street1").value;
    school.status = document.getElementById("status1").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/update',
        data: school
    }).done(res =>{
        Swal.fire({
            title: 'The school has been modified',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getSchools();
                document.getElementById("close").click();
            }
        })
    });
}

const deleteSchool= async(id)=>{
    let school = new Object();
    school.id = id;
    await $.ajax({
        method: "POST",
        url: url + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'The school has been delete',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getSchools();
            }
        })
    });
}