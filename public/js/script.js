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

        let $ul = $("<ul>");
        let $div = $("<div>") ;
        let $leftAlign = $(".left-align");
        // let $deleteBtn = $("<button>").attr({
        //                class: 'delete-btn btn btn-default',
        //                 key: 'delete'
        //             }).text("Delete");
        let $addBtn = $("<button>").attr({
                        "keyID": '/new/' + art.index})
                      .text("add to Scrapbook").addClass('add-btn btn btn-default');
        let $br1 = $("<br>");
        let $br2 = $("<br>");

        let $img = $("<img>").attr('src', art.image.full);
        let $publishDate =$('<li>').text("Publish Date : " + art.created_publish_date) ;
        let $creator = $('<li>').text("Creator : "+art.creator) ;
        let $title = $('<li>').text("Title : "+art.title) ;

        $ul.append($title, $img, $publishDate, $creator,$addBtn)
        $div.append($ul, $br1, $br2)
        $leftAlign.append($div);
        // $div.append()


      })
      $(".add-btn").on('click', addArt);
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
      dataType: 'json'
    })
    .done(function(data) {
      // console.log(data);
      data.art.map(function(artWork) {
        // console.log(artWork)
        let $ul = $("<ul>").addClass('right-uls');
        let $div = $("<div>") ;
        let $rightAlign = $(".right-align");
        let $deleteBtn = $("<button>").attr({
            "data-url":'/search/'+artWork.art_id}).text("Delete").addClass('btn btn-default delete-btn');
        let $br1 = $("<br>");
        let $br2 = $("<br>");

        let $img = $("<img>").attr('src', artWork.art_image);
        let $publishDate =$('<li>').text("Publish Date : " + artWork.art_publish_date) ;
        let $creator = $('<li>').text("Creator : "+artWork.art_creator) ;
        let $title = $('<li>').text("Title : "+artWork.art_title) ;

        $ul.append($title, $img, $publishDate, $creator,$deleteBtn)
        $div.append($ul);
        $div.append( $br1, $br2)
        $rightAlign.append($div)


      })
        $(".delete-btn").on("click", deleteItem);
       /*end of map func. */

    })
    .fail(function() {
      console.log("error");
    })

  }) /*end of GET db click event*/




  // POST data
    function addArt(event) {
      console.log("post event clicked")
      // event.preventDefault();

      let $children = $(event.target).parent().children();

      let data = {
        art_title: $children.eq(0).text(),
        art_image: $children.eq(1).attr("src"),
        art_publish_date: $children.eq(2).text(),
        art_creator: $children.eq(3).text()
      }
      // console.log(data)
      $.post('/search/new', data)
        .done( (response)=> {
          console.log("this is the .done res "+response)

        })
    }
  // $('.add-btn').click(addArt);




  function deleteItem(e){
    // e.stopPropagation()
    console.log("clicked")
    let url = $(e.target).attr("data-url");
    console.log(url)
    $.ajax({
      url: url,
      method: 'delete'
    }).done(function(arguments){
      console.log(arguments);
      $(e.target).parent().remove();
      // let $children = $(event.target).parent().children();
    })
  }















})
