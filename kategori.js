$( document ).ready(function() {

  //sonuçların css class ismi
  var searchResultsItem = ".searchResultsItem";


  if ($( searchResultsItem ).length <= 0) {return;}
  //sonuçlar içinde döngü
  $( searchResultsItem ).each(function( index ) {
    //ilanın linki
    var link = $(this).find('.classifiedTitle').attr('href');


    //callback yaparken 'this' keywordlerinin çakışmaması için gerekli değişken
    var thisItem = this;
 
    if(link != null || link != undefined)
    {

          var liste = [];
          
          //HTTP GET methoduyla linke git
          $.get('https://www.sahibinden.com'+link, function(responseText) {
          
          //$.parseHTML( string ) methodu ile responseText'i Html'e çevirelim
          //böylelikle diğer sayfadaki elemenleri rahatlıkla okuyabiliriz.
          var html = $.parseHTML(responseText);


          var trOpen =  "<tr>"
          var trClose =  "</tr>";
          var td =  "";

          $(html).find('.trackLinkClick.trackId_breadcrumb').each(function(index)
          {
              //ilanın detay sayfasındaki kategori linklerini array'e ekle.
              liste[index] =  $.trim($(this).text());
              td +=  "<b>"+liste[index] + "</b>>";
          });

           

            if (liste.length > 0) {
              //son karakteri sil '>'  
              td = td.slice(0, -1);

              var colLen= $(thisItem).find("td").length;
              
              var afterSonuc = trOpen + "<td colspan="+colLen+">"+ td +"</td>" + trClose;
              
              $(thisItem).after(afterSonuc);
             
           }

        });   
     }
});

});

