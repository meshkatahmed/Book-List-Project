//UI element
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');


//Event listeners
form.addEventListener('submit',newBook);
bookList.addEventListener('click',removeBook);

//Functions
function newBook(e){
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    if(title===''||author===''||isbn===''){
        ui.showAlert("Please fill all the fields!!",'error');
    } else{
        let book = new Book(title,author,isbn);
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert('Book added!!','success');
        
    }
    e.preventDefault();
}
function removeBook(e){
    UI.deleteFromBookList(e.target);
    e.preventDefault();
}

//Book class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class
class UI{
    
    static addToBookList(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }
    static deleteFromBookList(target){
        if (target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            this.showAlert('Book removed!!','success');
        }
    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        //let form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        },3000);
    }
}