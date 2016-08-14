$(document).ready(function() {
  console.log("Ready!")

  let $apiBtn   = $(".api-btn")
  let $dbBtn = $(".db-btn");

  // PULL DATA FROM API
  $apiBtn.on("click", (event)=> {
    event.preventDefault();
    let $leftAlign = $(".left-align").empty()
    let $input = $(".user-input").val();

    $.ajax({
      url: `http://loc.gov/pictures/search/`,
      type: 'GET',
      dataType: 'jsonp',
      // headers:{
      //   "Origin": "http://localhost:3000"
      // },
      data:{
        q: $input,
        fo:'json'
      }
    })
    .done(function(data) {

      // map to loop over each result from the search
      data.results.map(function(art) {
        // console.log(art);
        let $ul = $("<ul>");
        let $leftAlign = $(".left-align");
        // let $deleteBtn = $("<button>").attr({
        //                class: 'delete-btn btn btn-default',
        //                 key: 'delete'
        //             }).text("Delete");
        let $addBtn = $("<button>").attr({
                       class: 'add-btn btn btn-default',
                        key: 'add'
                    }).text("Store");
        let $br1 = $("<br>");
        let $br2 = $("<br>");

        let $img = $("<img>").attr('src', art.image.full);
        let $publishDate =$('<li>').text("Publish Date : " + art.created_publish_date) ;
        let $creator = $('<li>').text("Creator : "+art.creator) ;
        let $title = $('<li>').text("Title : "+art.title) ;

        $ul.append($title, $img, $publishDate, $creator, $addBtn, $br1, $br2)
        $leftAlign.append($ul)


      })
    })
    .fail(function() {
      console.log("error");
    })


  }) /* end of click event from API*/









  // GET data from db
  $dbBtn.on("click", function(event) {
    event.preventDefault();
    let $rightAlign = $(".right-align").empty();

    $.ajax({
      url: '/search',
      type: 'GET',
      dataType: 'json',
      data: {param1: 'value1'},
    })
    .done(function(data) {
      // console.log(data);
      data.art.map(function(artWork) {
        // console.log(artWork)
        let $ul = $("<ul>").addClass('right-uls');
        let $rightAlign = $(".right-align");
        let $deleteBtn = $("<button>").attr({
                       class: 'delete-btn btn btn-default',
                        key: 'delete'
                    }).text("Delete");
        let $addBtn = $("<button>").attr({
                       class: 'add-btn btn btn-default',
                        key: 'add'
                    }).text("Store");
        let $br1 = $("<br>");
        let $br2 = $("<br>");

        let $img = $("<img>").attr('src', artWork.art_image);
        let $publishDate =$('<li>').text("Publish Date : " + artWork.art_publish_date) ;
        let $creator = $('<li>').text("Creator : "+artWork.art_creator) ;
        let $title = $('<li>').text("Title : "+artWork.art_title) ;

        $ul.append($title, $img, $publishDate, $creator, $addBtn, $deleteBtn, $br1, $br2)
        $rightAlign.append($ul)


      }) /*end of map func. */
    })
    .fail(function() {
      console.log("error");
    })

  }) /*end of GET db click event*/




  // POST new data
  $.ajax({
    url: 'new',
    type: 'POST',
    dataType: 'json',
    data: {param1: 'value1'},
  })
  .done(function(data) {
    console.log("success at posting data");
    console.log(data);

  })
  .fail(function() {
    console.log("error");
  })




















})
