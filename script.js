let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("search");

function saveToLocal() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable(data = students) {
  tableBody.innerHTML = "";
  data.forEach((student, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.regNo}</td>
        <td>${student.dept}</td>
        <td>${student.year}</td>
        <td>${student.marks}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const student = {
    name: form.name.value.trim(),
    regNo: form.regNo.value.trim(),
    dept: form.dept.value,
    year: form.year.value,
    marks: form.marks.value
  };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  form.reset();
  saveToLocal();
  renderTable();
});

function editStudent(index) {
  const s = students[index];
  form.name.value = s.name;
  form.regNo.value = s.regNo;
  form.dept.value = s.dept;
  form.year.value = s.year;
  form.marks.value = s.marks;
  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    saveToLocal();
    renderTable();
  }
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(value)
  );
  renderTable(filtered);
});

// Initial render
renderTable();
