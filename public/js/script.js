$(document).ready(function() {
  console.log("Ready!")

  let $btn   = $(".btn")

  $btn.on("click", (event)=> {
    event.preventDefault();
    let $leftAlign = $(".left-align").empty()
    let $input = $(".user-input").val();
    console.log($input)
    console.log("clicked")
    console.log($input)

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
      console.log(data.results)
      console.log($input)

      data.results.map(function(art) {
        console.log(art)
        let $ul = $("<ul>");
        let $leftAlign = $(".left-align");
        let $btn = $("<button>").attr({
                       class: 'delete-btn',
                        key: 'delete'
                    }).text("Delete");
        let $br1 = $("<br>");
        let $br2 = $("<br>");

        let $img = $("<img>").attr('src', art.image.full);
        let $publishDate =$('<li>').text("Publish Date : " + art.created_publish_date) ;
        let $creator = $('<li>').text("Creator : "+art.creator) ;
        let $title = $('<li>').text("Title : "+art.title) ;

        $ul.append($title, $img, $publishDate, $creator, $btn, $br1, $br2)
        $leftAlign.append($ul)


      })
    })
    .fail(function() {
      console.log("error");
    })


  }) /* end of click e*/























})
