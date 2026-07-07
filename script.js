let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData(){
    localStorage.setItem("students",JSON.stringify(students));
}

function addStudent(){

    let name=document.getElementById("studentName").value.trim();

    if(name==""){
        alert("Enter Student Name");
        return;
    }

    let student={
        id:Date.now(),
        name:name,
        present:0,
        absent:0
    }

    students.push(student);

    saveData();

    document.getElementById("studentName").value="";

    displayStudents();

}

function displayStudents(){

    let tbody=document.querySelector("tbody");

    tbody.innerHTML="";

    students.forEach((student,index)=>{

        let total=student.present+student.absent;

        let percent=0;

        if(total>0){
            percent=((student.present/total)*100).toFixed(1);
        }

        tbody.innerHTML+=`

        <tr>

        <td>${index+1}</td>

        <td>${student.name}</td>

        <td>
        ${student.present}
        <br><br>
        <button class="present" onclick="markPresent(${student.id})">Present</button>
        </td>

        <td>
        ${student.absent}
        <br><br>
        <button class="absent" onclick="markAbsent(${student.id})">Absent</button>
        </td>

        <td>${percent}%</td>

        <td>
        <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
        </td>

        </tr>

        `;

    });

}

function markPresent(id){

    students=students.map(student=>{

        if(student.id==id){

            student.present++;

        }

        return student;

    });

    saveData();

    displayStudents();

}

function markAbsent(id){

    students=students.map(student=>{

        if(student.id==id){

            student.absent++;

        }

        return student;

    });

    saveData();

    displayStudents();

}

function deleteStudent(id){

    if(confirm("Delete Student?")){

        students=students.filter(student=>student.id!=id);

        saveData();

        displayStudents();

    }

}

function searchStudent(){

    let value=document.getElementById("search").value.toLowerCase();

    let rows=document.querySelectorAll("tbody tr");

    rows.forEach(row=>{

        let text=row.children[1].innerText.toLowerCase();

        if(text.includes(value)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }

    });

}

displayStudents();