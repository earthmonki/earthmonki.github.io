
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
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(currentSearch)}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}`;
  $.getJSON(url, function (data) {
    $('#results').empty();
    totalItems = data.totalItems;

    if (data.items) {
      data.items.forEach(item => {
        const title = item.volumeInfo.title;
        const thumbnail = item.volumeInfo.imageLinks?.thumbnail || '';
        const bookId = item.id;
        $('#results').append(
          `<div class="result">
            <img src="${thumbnail}" alt="Cover">
            <h3><a href="bookdetails.html?id=${bookId}">${title}</a></h3>
          </div>`
        );
      });

      const pages = Math.ceil(Math.min(60, totalItems) / RESULTS_PER_PAGE);
      $('#pageSelect').empty();
      for (let i = 0; i < pages; i++) {
        $('#pageSelect').append(`<option value="${i}">${i + 1}</option>`);
      }
    }
  });
}

function fetchBookDetails(bookId) {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  $.getJSON(url, function (data) {
    const info = data.volumeInfo;
    const saleInfo = data.saleInfo;
    $('#bookDetail').html(`
      <h2>${info.title}</h2>
      <p><strong>Authors:</strong> ${info.authors?.join(', ')}</p>
      <p><strong>Publisher:</strong> ${info.publisher}</p>
      <p><strong>Description:</strong> ${info.description}</p>
      <img src="${info.imageLinks?.thumbnail}" alt="Cover">
      <p><strong>Price:</strong> ${saleInfo?.listPrice ? saleInfo.listPrice.amount + ' ' + saleInfo.listPrice.currencyCode : 'N/A'}</p>
      <p><a href="${info.previewLink}" target="_blank">Preview this book</a></p>
    `);
  });
}

function fetchBookshelf() {
  const url = `https://www.googleapis.com/books/v1/users/102850353256067150808/bookshelves/2/volumes`;

  $.getJSON(url, function (data) {
    const container = $('#bookshelf');
    container.empty();

    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const info = item.volumeInfo;
        const title = info.title;
        const thumbnail = info.imageLinks?.thumbnail || '';
        const bookId = item.id;

        container.append(`
          <div class="result">
            <img src="${thumbnail}" alt="Cover">
            <h3><a href="bookdetails.html?id=${bookId}">${title}</a></h3>
          </div>
        `);
      });
    } else {
      container.append('<p>No books found in your public bookshelf.</p>');
    }
  }).fail(function () {
    $('#bookshelf').append('<p>Error loading bookshelf. Please try again later.</p>');
  });
}
