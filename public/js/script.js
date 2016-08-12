$(document).ready(function() {
  console.log("Ready!")

  let $input = $(".input").val();
  let $btn   = $(".btn")
  console.log($input)

  $btn.on("click", (event)=> {
    event.preventDefault();
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
      data.results.map(function(art) {
        let $img = $("<img>").attr('src', art.image.full);
        console.log($img)
        console.log(art.image.full)
      })
    })
    .fail(function() {
      console.log("error");
    })


  }) /* end of click e*/























})
