// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI() { }
UI.prototype.addBookToList = function (book) {
    // console.log(book);
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');
    //console.log(row);

    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    // Create Div
    const div = document.createElement('div');

    // Add classes
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector('.container');

    // Get form
    const form = document.querySelector('#book-form');

    // Insert Alert
    container.insertBefore(div, form);

    // Timeout after 2 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();

    }, 2000);
}

// Clear Fields After Entering Book
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listener for Add book

// Event Listeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value
        //console.log(title, author, isbn);

        // Instantiate book
        const book = new Book(title, author, isbn);
        // console.log(book)

        //Instantiate UI
        const ui = new UI();

        console.log(ui);

        //Validating whether it meets all fields, or is added
        if (title === '' || author === '' || isbn === '') {
            //console.log('fail');
            ui.showAlert('Please fill in all fields', 'error')
        }
        else {
            // Add book to list
            ui.addBookToList(book);

            // Show success
            ui.showAlert('Book Added!', 'success');

            // Delete Book
            UI.prototype.deleteBook = function(target){
                if(target.className === 'delete'){
                    target.parentElement.parentElement.remove();
                }
            }

            // Clear fields
            ui.clearFields();
        }

        e.preventDefault();
    });

// Event Listener for Delete
document.getElementById('book-list').addEventListener
    ('click', function (e) {
        //console.log(123);
        const ui = new UI();
        ui.deleteBook(e.target);

        // show message
        ui.showAlert('Book Removed!', 'success');
        e.preventDefault();
    });
