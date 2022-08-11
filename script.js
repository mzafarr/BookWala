let bookList = [];
let booksContainer = document.querySelector('.books-container');
let addBookBtn = document.querySelector('#add-book-btn');
let newBookInterfaceElement = document.querySelector('#add-book-interface');
let overlayElement = document.querySelector('#overlay');
let filter = document.querySelector('.filter-bar');
let counter = 0;

//test books
let book1 = new Book('Clean Code', 'Robert C. Martin', 464, true);
let book2 = new Book('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 352, false);
let book3 = new Book('Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 448, true);
let book4 = new Book('How to win Friends & Influence People', 'Dale Carnegie', 246, true);
let book5 = new Book('Think and Grow Rich', 'Napoleon Hill', 378, false);
let book6 = new Book('Rich Dad Poor Dad', 'Robert T. Kiyosaki', 336, true);

addBookToList(book1);
addBookToList(book2);
addBookToList(book3);
addBookToList(book4);
addBookToList(book5);
addBookToList(book6);
displayAllBooks(bookList);


filter.addEventListener('keyup', filterBooks);

addBookBtn.addEventListener('click', toggleNewBookInterface);

newBookInterfaceElement.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
})

overlayElement.addEventListener('click', toggleNewBookInterface)


function filterBooks(e) {
    let filterText = filter.value;
    let bookList = document.querySelectorAll('.book');
    console.log(bookList)
    Array.from(bookList).forEach(book => {
        let bookTitle = book.querySelector('.name').innerText;
        if (bookTitle.toLowerCase().indexOf(filterText) != -1) {
            book.style.display = 'grid';
        }
        else {
            book.style.display = 'none';
        }
    });
}

function Book(name, author, pages, read = false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToList(book) {
    bookList.push(book);
}

function displayAllBooks(bookList) {
    for (book in bookList) {
        let bookElement = document.createElement('div');
        let bookData = document.createElement('div');
        bookData.classList.add('book-data');
        bookElement.classList.add('book');

        let name = document.createElement('div');
        name.classList.add('name');
        name.innerText = `"${bookList[book].name}"`;
        bookData.append(name);

        let author = document.createElement('div');
        author.classList.add('author');
        author.innerText = `"${bookList[book].author}"`;
        bookData.append(author);

        let pages = document.createElement('div');
        pages.classList.add('pages');
        pages.innerText = `"${bookList[book].pages}"`;
        bookData.append(pages);
        bookElement.append(bookData);

        let bookBtns = document.createElement('button');
        bookBtns.classList.add('book-btns');
        let readBtn = document.createElement('button');

        if (bookList[book].read === true) {
            readBtn.classList.add('btn', 'read-btn', 'btn-success');
            readBtn.innerText = "READ";
        }
        else {
            readBtn.classList.add('btn', 'read-btn', 'btn-danger');
            readBtn.innerText = "NOT READ";
        }
        readBtn.addEventListener('click', toggleRead);
        bookBtns.append(readBtn);

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn', 'btn', 'btn-outline-dark');
        removeBtn.innerText = "REMOVE";
        removeBtn.addEventListener('click', removeBook);
        bookBtns.append(removeBtn);
        bookElement.append(bookBtns);
        bookElement.setAttribute('data', counter);
        counter++;

        booksContainer.append(bookElement);
    }
}

function displayBook(book) {
    let bookElement = document.createElement('div');
    let bookData = document.createElement('div');
    bookData.classList.add('book-data');

    bookElement.classList.add('book');

    let name = document.createElement('div');
    name.classList.add('name');
    name.innerText = `"${book.name}"`;
    bookData.append(name);

    let author = document.createElement('div');
    author.classList.add('author');
    author.innerText = `"${book.author}"`;
    bookData.append(author);

    let pages = document.createElement('div');
    pages.classList.add('pages');
    pages.innerText = `"${book.pages}"`;
    bookData.append(pages);
    bookElement.append(bookData);

    let bookBtns = document.createElement('button');
    bookBtns.classList.add('book-btns');

    let readBtn = document.createElement('button');
    if (book.read === true) {
        readBtn.classList.add('btn', 'read-btn', 'btn-success');
        readBtn.innerText = "READ";
    }
    else {
        readBtn.classList.add('btn', 'read-btn', 'btn-danger');
        readBtn.innerText = "NOT READ";
    }
    readBtn.addEventListener('click', toggleRead);
    bookBtns.append(readBtn);

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn', 'btn', 'btn-outline-dark');
    removeBtn.innerText = "REMOVE";
    removeBtn.addEventListener('click', removeBook);
    bookBtns.append(removeBtn);
    bookElement.append(bookBtns);
    bookElement.setAttribute('data', counter);

    booksContainer.append(bookElement);
}

function toggleRead(e) {
    let bookElement = e.target.closest('.book');
    let index = bookElement.getAttribute('data');
    let book = bookList[index];

    if (book.read === true) {
        book.read = false;
        e.target.classList.add('btn-danger');
        e.target.classList.remove('btn-success');
        e.target.innerText = 'NOT READ';
    }
    else {
        book.read = true;
        e.target.classList.add('btn-success');
        e.target.classList.remove('btn-danger');
        e.target.innerText = 'READ';
    }
}

function removeBook(e) {
    let bookElement = e.target.closest('.book');
    let index = bookElement.getAttribute('data');

    bookList.splice(index, 1);
    bookElement.remove();
}

function toggleNewBookInterface() {
    newBookInterfaceElement.classList.toggle('active');
    overlayElement.classList.toggle('active');
}

function addBook() {
    let newBookName = document.querySelector('.new-book-name');
    let newBookAuthor = document.querySelector('.new-book-author')
    let newBookPages = document.querySelector('.new-book-pages')
    let checkBox = document.querySelector('.checkbox')
    let book = new Book(newBookName.value, newBookAuthor.value, newBookPages.value, checkBox.value)

    //error handling for repeated books
    if (this.books.some((book) => book.title === newBook.title)) {
        let errorMsg = document.querySelector('.error-msg');
        errorMsg.classList.add('active');
        return
    }

    addBookToList(book);
    displayBook(book);
    toggleNewBookInterface();

    function resetNewBookForm(newBookName, newBookAuthor, newBookPages, checkBox) {
        newBookName.value = '';
        newBookAuthor.value = '';
        newBookPages.value = '';
        checkBox.checked = false;
    }

    resetNewBookForm(newBookName, newBookAuthor, newBookPages, checkBox);
}





