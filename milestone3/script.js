
$(document).ready(function () {
  let allBooks = [];
  let currentPage = 0;

  function loadBooks(callback) {
    $.getJSON("mock-books.json", function (data) {
      allBooks = data;
      callback();
    });
  }

  function showPage(page) {
    currentPage = page;
    const perPage = 10;
    const start = page * perPage;
    const books = allBooks.slice(start, start + perPage);
    const container = $("#results").empty();

    books.forEach(book => {
      container.append(`
        <div class="result" data-id="${book.id}">
          <img src="${book.thumbnail}" alt="Cover">
          <p>${book.title}</p>
        </div>
      `);
    });

    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(allBooks.length / 10);
    const container = $("#pagination").empty();
    for (let i = 0; i < totalPages; i++) {
      const active = i === currentPage ? "active" : "";
      container.append(`<span class="page-link ${active}" data-page="${i}">${i + 1}</span>`);
    }
  }

  function showDetails(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
      $("#details").html(`
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.authors.join(", ")}</p>
        <p><strong>Publisher:</strong> ${book.publisher}</p>
        <p><strong>Description:</strong> ${book.description}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <a href="${book.previewLink}" target="_blank">Preview</a>
      `);
    }
  }

  function showBookshelf() {
    const shelf = allBooks.slice(0, 5);
    const container = $("#bookshelf").empty();
    shelf.forEach(book => {
      container.append(`
        <div class="result" data-id="${book.id}">
          <img src="${book.thumbnail}" alt="Cover">
          <p>${book.title}</p>
        </div>
      `);
    });
  }

  // Event Listeners
  $("#results").on("click", ".result", function () {
    const bookId = $(this).data("id");
    showDetails(bookId);
  });

  $("#bookshelf").on("click", ".result", function () {
    const bookId = $(this).data("id");
    showDetails(bookId);
  });

  $("#pagination").on("click", ".page-link", function () {
    const page = parseInt($(this).data("page"));
    showPage(page);
  });

  $("#searchBtn").on("click", function () {
    showPage(0);
  });

  // Initial load
  loadBooks(() => {
    showBookshelf();
    showPage(0);
  });
});
