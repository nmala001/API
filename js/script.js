
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();

    var address = streetStr + ', '+ cityStr ;
    $greeting.text('So you want to stay at'+ address + '?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location= '+address+' ';

    $body.append('<img class="bgimg" src= "'+streetviewURL+'" >');


    // clear out old data before new request
    $wikiElem.text("");
    

    // load streetview

    // YOUR CODE GOES HERE!




    //New york times article search ajax request comes here 

    var nyturl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +cityStr+ '&sort=newest&api-key=0f1f3b0095154a7fbdc266ede65a5996';
        
        $.getJSON(nyturl, function(data){
            $nytHeaderElem.text('New York Times Articles About' +cityStr);
            articles = data.response.docs;

            for(var i=0;i< articles.length; i++){

                var article = articles[i];
                $nytElem.append('<li class="article">' + 

                    '<a href= "'+article.web_url+'">' + article.headline.main+ '</a>' + 

                    '<p>' + article.snippet + '</p>'+ '</li>');
            };
        
        })

            return false;
        };



$('#form-container').submit(loadData);
