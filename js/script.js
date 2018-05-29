
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
        
        }).error(function(e){

            $nytHeaderElem.text('New York Times Articles could not be loaded');
        });


    //Adding the Wikipedia ajax requests

    var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+' &format=json&callback=wikiCallback';

        $.ajax({

            url: wikiurl,
            datatype: "jsonp",
            jsonp:"callback",

            success: function(response){
                var articleList = response[1];

                for(var i=0; i<articleList.length; i++){

                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' +articleStr;

                    $wikiElem.append('<li><a href = "'+url+'">' + articleStr + '</li></a>');
                };


            }
        });

            return false;
        };



$('#form-container').submit(loadData);
