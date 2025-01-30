// Do your work here...
console.log('Hello, world!');

const bookTitle = document.getElementById('bookFormTitle');
const bookAuthor = document.getElementById('bookFormAuthor');
const bookYear = document.getElementById('bookFormYear');
const bookIsComplete = document.getElementById('bookFormIsComplete');
const bookSubmit = document.getElementById('bookFormSubmit');

const inCompleteList = document.getElementById('incompleteBookList');
const completeList = document.getElementById('completeBookList');

const pasKeys = 'KEYS_DATABOOKS';


document.addEventListener('DOMContentLoaded', function() {

    
    if (typeof Storage !== 'undefined') {
        if (!localStorage.getItem(pasKeys)) {
            localStorage.setItem(pasKeys, JSON.stringify([]));
        }
    }
    
    renderBook();

    bookSubmit.addEventListener('click', function(event) {
        event.preventDefault();

        const dataBook = JSON.parse(localStorage.getItem(pasKeys)) || []; 

        dataBook.push(addData(generateId(), bookTitle.value, bookAuthor.value, bookYear.value, bookIsComplete.checked));

        localStorage.setItem(pasKeys, JSON.stringify(dataBook));
        renderBook();

        bookTitle.value = '';
        bookAuthor.value = '';
        bookYear.value = '';
        bookIsComplete.checked = false;
    });

});

function selesaiBaca (id) {
    const data = JSON.parse(localStorage.getItem(pasKeys));
    const bookIndex = data.findIndex(book => book.id === id);
    
    if (bookIndex !== -1) {
        data[bookIndex].selesai = !data[bookIndex].selesai;
        localStorage.setItem(pasKeys, JSON.stringify(data));
        renderBook();
    }
};

function hapusBook (id) {
    let data = JSON.parse(localStorage.getItem(pasKeys));
    data = data.filter(book => book.id !== id);
    
    localStorage.setItem(pasKeys, JSON.stringify(data));
    renderBook();
};

function addData (id, judul, penulis, tahun, selesai) {
    return {
        id,
        judul,
        penulis,
        tahun,
        selesai,
    }
}

function generateId() {
    return Date.now();
}

function renderBook() {

    inCompleteList.innerHTML = '';
    completeList.innerHTML = '';

    const data = JSON.parse(localStorage.getItem(pasKeys));
    // console.log(data);

    if (data === null) {
        return;
    }

    data.forEach(function(book) {
        const newItems = document.createElement('div');
        newItems.setAttribute('data-bookid', `${book.id}`);
        newItems.setAttribute('data-testid', `bookItem`);

        newItems.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.judul}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.penulis}</p>
            <p data-testid="bookItemYear">Tahun: ${book.tahun}</p>

            <div>
                <button data-testid="bookItemIsCompleteButton" class="selesaiBaca">Selesai Baca</button>

                <button data-testid="bookItemDeleteButton" class="hapusButton">Hapus</button>
                <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
        `;

        const selesaiButton = newItems.querySelector(".selesaiBaca");
        selesaiButton.addEventListener('click', function() {
            const bookSelesaiId = book.id;
            selesaiBaca(bookSelesaiId);
        });

        const hapusButton = newItems.querySelector(".hapusButton");
        hapusButton.addEventListener('click', function() {
            const hapusId = book.id;
            hapusBook(hapusId);
        });

        if (book.selesai === true) {
            completeList.appendChild(newItems);
        } else {
            inCompleteList.appendChild(newItems);
        }
    });
    
}

