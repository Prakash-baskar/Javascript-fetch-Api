function returnpage() {
    window.location.href =("index.html")
}

window.onload = () => {
    addData()
}



function addData() {
    fetch("https://65adedce1dfbae409a739505.mockapi.io/student")
.then(res => res.json())
.then(data => {
    let table ="";
    for (let i = 0; i < data.length; i++) {
       table += "<tr>"
       table += "<td>" +data[i].id+"</td>"
       table += "<td>"+data[i].name + "</td>"
       table += "<td>"+data[i].email+ "</td>"
       table += "<td>"+data[i].phonenumber+"</td>"
       table += "<td>"+data[i].lang+"</td>"
       table += "<td>"+data[i].dateofbirth+ "</td>"
       table += "<td>"+data[i].password+ "</td>"
       table += "<td>"+data[i].confirmpassword+ "</td>"
       table += "<td>" + data[i].status + "</td>"
       table += "<td>" + data[i].malegender + "</td>"
       table += "<td><button class='etf' onclick=editForm("+data[i].id+")>Edit</button> <button class='del' onclick=del("+data[i].id+")>Delete</button></td>"
       table += "</tr>"  
       console.log(data);
    }
    document.getElementById("tablecontent").innerHTML = table
})
}

function del(id){
    fetch("https://65adedce1dfbae409a739505.mockapi.io/student/"+id,
{method:"DELETE",
 headers:{"Content-Type":"application/json"}})
 .then(res => res.json())
 .then((data)=>{console.log(data)})  
 addData()
}


function editForm(id){
    // editId=id;
    // console.log(id);
    window.location.href = `index.html?edit=${id}`
}








 
