// let arr =[]
document.addEventListener("DOMContentLoaded",() => {
    const url = new URLSearchParams(window.location.search)
    const editUserId = url.get("edit")
    if (editUserId) {   
        fetch(`https://65adedce1dfbae409a739505.mockapi.io/student/${editUserId}`)
        .then((res) => res.json())
        .then(student =>{  getData(student) })
        .catch((error) =>console.error("error:",error))
    }
})
// edit function 
function getData(student) {
    console.log( student.dateofbirth);
    let editDate = student.dateofbirth
    console.log( editDate);
    let editArray = editDate.split("-")   //splited into object  and added to array in the name of editArray
   
        let year = parseInt(editArray[2])   //this change into number
    console.log(typeof year);
    let month = parseInt(editArray[1])
    console.log(month);
    let date = parseInt(editArray[0])
    console.log(date);
    let arranged = `${year}-${month.toString().padStart(2,"0")}-${date.toString().padStart(2,"0")}`
console.log(arranged);
document.getElementById("dob").value = arranged

     document.getElementById("name").value = student.name
     document.getElementById("email").value = student.email
     document.getElementById("pnumber").value  = student.phonenumber
      document.getElementById("Language").value  = student.lang
    // document.getElementById("dob").value = student.dateofbirth
      document.getElementById("password").value = student.password
     document.getElementById("cpassword").value = student.confirmpassword
   if (student.malegender === "Male") {
    document.getElementById("malegender").checked = true;
   } else {
    document.getElementById("femalegender").checked = true;
   }
     if(student.status === "Present"){
        document.getElementById("chbox").checked=true;
     }
    else{
        document.getElementById("chbox").checked=false;
     }


     
     
    
}




// submit function
// let form = document.getElementById("form")
function validation(event){
    event.preventDefault()
    const url = new URLSearchParams(window.location.search)
    const editUserId = url.get("edit")
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phonenumber = document.getElementById("pnumber").value;
    let malegender = document.getElementById("malegender");
    let femalegender = document.getElementById("femalegender");
    let Lang = document.getElementById("Language").value
    let dateofbirth = document.getElementById("dob").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("cpassword").value;
    let status = document.getElementById("chbox")
    
    const date = new Date(dateofbirth);
    console.log(date);
console.log(typeof  date);
    const khelo = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    console.log(khelo);
   

    if(name === ""){
        document.getElementById("nameerror").innerHTML="Name is required"
        document.getElementById("nameerror").style.color="red"
    }
    else if(name.length < 3 || name.length > 10 ){
        document.getElementById("nameerror").innerHTML="Name must be above 3 & below 10 characters"
        document.getElementById("nameerror").style.color="red"
    }
    else{
        document.getElementById("nameerror").innerHTML=""
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email ===""){
        document.getElementById("emailerror").innerHTML="Email is required"
        document.getElementById("emailerror").style.color="red"
    }
    else if(!emailValid.test(email)){
        document.getElementById("emailerror").innerHTML="Invalid Email Format"
        document.getElementById("emailerror").style.color="red"
    }
    else{
        document.getElementById("emailerror").innerHTML=""
    }
    const phone = /^\d{10}$/
    if(phonenumber ===""){
        document.getElementById("Pnumbererror").innerHTML="Number is required"
        document.getElementById("Pnumbererror").style.color="red"
    }
    else if (!phone.test(phonenumber)){
        document.getElementById("Pnumbererror").innerHTML="Please Enter 10 Digit Number"
        document.getElementById("Pnumbererror").style.color="red"
    }
    else{
        document.getElementById("Pnumbererror").innerHTML=""
    }

    if (malegender.checked || femalegender.checked) {
        document.getElementById("gendererror").innerHTML = "";

    } else {
        document.getElementById("gendererror").innerHTML = "Gender is Required";
        document.getElementById("gendererror").style.color = "red"
    }
   
    if(Lang ===""){
        document.getElementById("langerror").innerHTML = "language is required"
        document.getElementById("langerror").style.color = "red"
    }
    else{
        document.getElementById("langerror").innerHTML=""
    }

    if(dateofbirth ===""){
        document.getElementById("doberror").innerHTML="DOB is required"
        document.getElementById("doberror").style.color="red"
    }
    else{
        document.getElementById("doberror").innerHTML=""
    }
    // const pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(password ===""){
        document.getElementById("passerror").innerHTML="Password is required"
        document.getElementById("passerror").style.color="red"
    }
    // else if (!pass.test(password) ){
    //     document.getElementById("passerror").innerHTML="least 6 characters"
    //     document.getElementById("passerror").style.color="red"
    // }

    else{
        document.getElementById("passerror").innerHTML=""
    }

    if(confirmpassword ===""){
        document.getElementById("cperror").innerHTML=" Password is required"
        document.getElementById("cperror").style.color="red"
    }
    else if(password !== confirmpassword){
        document.getElementById("cperror").innerHTML=" Password must be same"
        document.getElementById("cperror").style.color="red"
    }
    else{
        document.getElementById("cperror").innerHTML=""
    }
    // condition 
    if (name === "" || 
        name.length < 3  || 
        name.length > 10 || 
        email ==="" || 
        !emailValid.test(email) ||
        phonenumber ==="" ||
        !phone.test(phonenumber)) {
        return false
    }
    // object to store
    let obj ={
        name:name,
        email:email,
        phonenumber:phonenumber,
        lang:Lang,
        dateofbirth:khelo,
        password:password,
        confirmpassword:confirmpassword,
        malegender:malegender.checked ? "Male" :"Female",
        status:status.checked ? "Present" : "Absent",
    
    };
    // edit to api store to convert table
    if (editUserId) {
        fetch(`https://65adedce1dfbae409a739505.mockapi.io/student/${editUserId}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json",},
            body:JSON.stringify(obj)
        })
        .then((res) => {res.json(); window.location.href = "table.html"})
    }
     else if( name !=="" && email !=="" && phonenumber !=="" && 
    dateofbirth !=="" && password !=="" && confirmpassword !==""&&
    malegender.checked || femalegender.checked ){
        
    // post method 
        
        fetch("https://65adedce1dfbae409a739505.mockapi.io/student",
        {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)}
        )
        .then((res) =>res.json())
        .then((data)=>{console.log(data)
                window.location.href = "table.html";
            })
       

    }


    if(
        name !=="" && email !=="" && phonenumber !=="" && 
        dateofbirth !=="" && password !=="" && confirmpassword !==""&&
        (malegender.checked || femalegender.checked) && password == confirmpassword
        )
        {
             document.getElementById("name").value = ""
             document.getElementById("email").value = ""
             document.getElementById("pnumber").value = ""
             document.getElementById("dob").value = ""
             document.getElementById("password").value = ""
             document.getElementById("cpassword").value = ""
             document.getElementById("Language").value =""
             malegender.checked = false
             femalegender.checked = false
             
        }


      
}


