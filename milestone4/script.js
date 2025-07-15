let allBooks=[];let currentPage=0;const perPage=10;let gridView=true;let searchHistory=[];
$(document).ready(function(){
  $.getJSON("mock-books.json",function(data){
    console.log("Loaded JSON:",data);
    allBooks=data;
    renderResults();
    renderBookshelf();
  });

  function renderResults(filtered=null){
    const books=filtered||allBooks;
    const start=currentPage*perPage;
    const pageBooks=books.slice(start,start+perPage);
    const template=$("#result-template").html();
    $("#resultsContainer").empty();
    pageBooks.forEach(book=>{
      const rendered=Mustache.render(template,{id:book.id,title:book.title,authors:book.authors.join(", "),thumbnail:book.thumbnail});
      $("#resultsContainer").append(rendered);
    });
    $("#pageInfo").text(`Page ${currentPage+1} of ${Math.ceil(books.length/perPage)}`);
  }

  function renderBookshelf(){
    const shelfBooks=allBooks.slice(0,5);
    const template=$("#bookshelf-template").html();
    $("#bookshelfContainer").empty();
    shelfBooks.forEach(book=>{
      const rendered=Mustache.render(template,{id:book.id,title:book.title,authors:book.authors.join(", "),thumbnail:book.thumbnail});
      $("#bookshelfContainer").append(rendered);
    });
  }

  function addToHistory(term){
    if(term&&!searchHistory.includes(term)){
      searchHistory.push(term);
      $("#searchHistory").append(`<li>${term}</li>`);
    }
  }

  $("#searchBtn").click(function(){
    const term=$("#searchInput").val().toLowerCase();
    addToHistory(term);
    if(term){
      const filtered=allBooks.filter(b=>b.title.toLowerCase().includes(term)||b.authors.join(",").toLowerCase().includes(term));
      currentPage=0;
      renderResults(filtered);
    }else{
      renderResults();
    }
  });

  $(document).on("click",".book-item",function(){
    const id=$(this).data("id");
    const book=allBooks.find(b=>b.id===id);
    if(book){
      const rendered=Mustache.render($("#detail-template").html(),{...book,authors:book.authors.join(", ")});
      $("#detailsSection").html(rendered).removeClass("hidden");
      $('html,body').animate({scrollTop:$("#detailsSection").offset().top},500);
    }
  });

  $(document).on("click","#closeDetail",function(){
    $("#detailsSection").addClass("hidden").empty();
  });

  $("#toggleView").click(function(){
    gridView=!gridView;
    if(gridView){
      $("#resultsContainer,#bookshelfContainer").removeClass("list-view").addClass("grid-view");
      $(this).text("Switch to List View");
    }else{
      $("#resultsContainer,#bookshelfContainer").removeClass("grid-view").addClass("list-view");
      $(this).text("Switch to Grid View");
    }
  });

  $("#nextPage").click(function(){
    if((currentPage+1)*perPage<allBooks.length){
      currentPage++;
      renderResults();
    }
  });

  $("#prevPage").click(function(){
    if(currentPage>0){
      currentPage--;
      renderResults();
    }
  });

  $("#showSearchTab").click(function(){
    $("#resultsSection,#controls,#searchHistorySection").show();
    $("#bookshelfSection").addClass("hidden");
  });

  $("#showBookshelfTab").click(function(){
    $("#resultsSection,#controls,#searchHistorySection").hide();
    $("#bookshelfSection").removeClass("hidden");
  });
});
