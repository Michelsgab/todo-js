let id = 1;
let editId = null;
let productArray = [];
let nameUser = document.getElementById("name");
let emailUser = document.getElementById("email");
let errorName = document.getElementById("errorName");
let errorEmail = document.getElementById("errorEmail");
let errorProfession = document.getElementById("errorProfession");
let saveButton = document.querySelector(".button__content");
let professionUser = document.getElementById("profession");
let loadingButtonSubmit = document.getElementById("buttonSubmit");

function getData() {
  let data = {};

  data.nameUser = nameUser.value;
  data.emailUser = emailUser.value;
  data.professionUser = professionUser.value;

  return data;
}

function validateData() {
  if (
    nameUser.value.trim() !== "" &&
    emailUser.value.trim() !== "" &&
    professionUser.value.trim() !== ""
  ) {
    return [nameUser, emailUser, professionUser];
  } else {
    if (nameUser.value.trim() === "") {
      setErrorValidation(nameUser, errorName);
    } else {
      setSuccessValidation(nameUser);
    }
    if (emailUser.value.trim() === "") {
      setErrorValidation(emailUser, errorEmail);
    } else {
      setSuccessValidation(emailUser);
    }
    if (professionUser.value.trim() === "") {
      setErrorValidation(professionUser, errorProfession);
    } else {
      setSuccessValidation(professionUser);
    }
  }
}

function setErrorValidation(input, message) {
  if (message == errorName) {
    message.innerText = "Please enter your name";
  }
  if (message == errorEmail) {
    message.innerText = "Please enter your e-mail";
  }
  if (message == errorProfession) {
    message.innerText = "Please enter your profession";
  }
  input.classList.add("review");
}

function setSuccessValidation(input) {
  errorName.innerText = "";
  errorEmail.innerText = "";
  errorProfession.innerText = "";
  input.classList.remove("review");
}

function insertItem(produto) {
  productArray.push(produto);
  produto.id = id++;
}

function listTable() {
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";

  for (let i = 0; i < productArray.length; i++) {
    let tr = tbody.insertRow();
    tr.classList.add("center");
    tr.classList.add()

    let tdId = tr.insertCell();
    let tdNameUser = tr.insertCell();
    let tdEmailUser = tr.insertCell();
    let tdProfessionUser = tr.insertCell();
    let tdOptions = tr.insertCell();

    tdId.innerText = productArray[i].id;
    tdNameUser.innerText = productArray[i].nameUser;
    tdEmailUser.innerText = productArray[i].emailUser;
    tdProfessionUser.innerText = productArray[i].professionUser;

    let iconEdit = document.createElement("i");
    iconEdit.classList.add(
      "bx",
      "bx-edit-alt",
      "icon",
      "bx-tada-hover",
      "bx-sm",
      "iconCursor"
    );
    iconEdit.setAttribute(
      "onclick",
      "editProduct(" + JSON.stringify(productArray[i]) + ")"
    );

    let iconRemove = document.createElement("i");
    iconRemove.classList.add(
      "bx",
      "bx-trash",
      "icon",
      "bx-tada-hover",
      "bx-sm",
      "iconCursor"
    );
    iconRemove.setAttribute(
      "onclick",
      "deleteProduct(" + productArray[i].id + ")"
    );

    tdOptions.appendChild(iconEdit);
    tdOptions.appendChild(iconRemove);
  }
}

function saveData() {
  let product = getData();

  if (validateData(product)) {
    if (editId == null) {
      insertItem(product);
      loadinButton();
    } else {
      update(editId, product);
      loadinButton();
    }
    cancel();
  }
}

function loadinButton() {
  loadingButtonSubmit.classList.add("button__loading");
  setTimeout(() => {
    loadingButtonSubmit.classList.remove("button__loading");
    listTable();
  }, 1500);
}

function deleteProduct(id) {
  if (confirm(`Do you really want to delete ID ${id}?`)) {
    let tbody = document.getElementById("tbody");

    for (let i = 0; i < productArray.length; i++) {
      if (productArray[i].id == id) {
        productArray.splice(i, 1);
        tbody.deleteRow(i);
      }
    }
    cancel();
  }
}

function update(id, product) {
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].id == id) {
      productArray[i].nameUser = product.nameUser;
      productArray[i].emailUser = product.emailUser;
      productArray[i].professionUser = product.professionUser;
    }
  }
}

function editProduct(dados) {
  editId = dados.id;

  nameUser.value = dados.nameUser;
  emailUser.value = dados.emailUser;
  professionUser.value = dados.professionUser;

  saveButton.innerText = "Update";
}

function cancel() {
  nameUser.value = "";
  emailUser.value = "";
  professionUser.value = "";

  saveButton.innerText = "Save";
  editId = null;

  nameUser.classList.remove("review");
  emailUser.classList.remove("review");
  professionUser.classList.remove("review");
  errorName.innerText = "";
  errorEmail.innerText = "";
  errorProfession.innerText = "";
}
