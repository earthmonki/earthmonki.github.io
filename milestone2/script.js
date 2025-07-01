const RESULTS_PER_PAGE = 12;
let currentSearch = "";
let totalItems = 0;

$(document).ready(function () {
  $('#searchBtn').on('click', function () {
    currentSearch = $('#searchInput').val();
    fetchBooks(0);
  });

  $('#pageSelect').on('change', function () {
    const pageIndex = parseInt($(this).val());
    fetchBooks(pageIndex * RESULTS_PER_PAGE);
  });

  if (window.location.pathname.includes('bookdetails.html')) {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');
    if (bookId) fetchBookDetails(bookId);
  }

  if (window.location.pathname.includes('bookshelf.html')) {
    fetchBookshelf();
  }
});

function fetchBooks(startIndex) {
  const mockResults = [
    {
      id: 'book1',
      title: 'The Great Gatsby',
      thumbnail: 'https://books.google.com/books/content?id=eLRhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book2',
      title: '1984',
      thumbnail: 'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book3',
      title: 'Pride and Prejudice',
      thumbnail: 'https://books.google.com/books/content?id=8hU_AQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book4',
      title: 'Brave New World',
      thumbnail: 'https://books.google.com/books/content?id=ekzJAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book5',
      title: 'Moby Dick',
      thumbnail: 'https://books.google.com/books/content?id=1sZKAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book6',
      title: 'Fahrenheit 451',
      thumbnail: 'https://books.google.com/books/content?id=3_QLAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    }
  ];

  const container = $('#results');
  const pageSize = RESULTS_PER_PAGE;
  const endIndex = Math.min(startIndex + pageSize, mockResults.length);
  const paginatedResults = mockResults.slice(startIndex, endIndex);

  container.empty();

  paginatedResults.forEach(book => {
    container.append(`
      <div class="result">
        <img src="${book.thumbnail}" alt="Cover">
        <h3><a href="bookdetails.html?id=${book.id}">${book.title}</a></h3>
      </div>
    `);
  });

  const totalPages = Math.ceil(mockResults.length / pageSize);
  $('#pageSelect').empty();
  for (let i = 0; i < totalPages; i++) {
    $('#pageSelect').append(`<option value="${i}">${i + 1}</option>`);
  }
}


function fetchBookDetails(bookId) {
  const mockBooks = {
    book1: {
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      publisher: 'Scribner',
      description: 'A classic novel of the Jazz Age that explores themes of decadence, idealism, and social change.',
      thumbnail: 'https://books.google.com/books/content?id=eLRhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      price: '$10.99',
      previewLink: 'https://books.google.com/books?id=eLRhDwAAQBAJ&printsec=frontcover'
    },
    book2: {
      title: '1984',
      authors: ['George Orwell'],
      publisher: 'Secker & Warburg',
      description: 'A dystopian novel set in a totalitarian society under constant surveillance.',
      thumbnail: 'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      price: '$9.99',
      previewLink: 'https://books.google.com/books?id=kotPYEqx7kMC&printsec=frontcover'
    },
    book3: {
      title: 'Pride and Prejudice',
      authors: ['Jane Austen'],
      publisher: 'T. Egerton',
      description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
      thumbnail: 'https://books.google.com/books/content?id=8hU_AQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      price: 'Free',
      previewLink: 'https://books.google.com/books?id=8hU_AQAAMAAJ&printsec=frontcover'
    }
  };

  const book = mockBooks[bookId];

  if (book) {
    $('#bookDetail').html(`
      <h2>${book.title}</h2>
      <p><strong>Authors:</strong> ${book.authors.join(', ')}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <img src="${book.thumbnail}" alt="Cover">
      <p><strong>Price:</strong> ${book.price}</p>
      <p><a href="${book.previewLink}" target="_blank">Preview this book</a></p>
    `);
  } else {
    $('#bookDetail').html(`<p>Book details not found.</p>`);
  }
}


function fetchBookshelf() {
  const container = $('#bookshelf');
  container.empty();

  const mockBooks = [
    {
      id: 'book1',
      title: 'The Great Gatsby',
      thumbnail: 'https://books.google.com/books/content?id=eLRhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book2',
      title: '1984',
      thumbnail: 'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    {
      id: 'book3',
      title: 'Pride and Prejudice',
      thumbnail: 'https://books.google.com/books/content?id=8hU_AQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    }
  ];

  mockBooks.forEach(book => {
    container.append(`
      <div class="result">
        <img src="${book.thumbnail}" alt="Cover">
        <h3><a href="bookdetails.html?id=${book.id}">${book.title}</a></h3>
      </div>
    `);
  });
}
