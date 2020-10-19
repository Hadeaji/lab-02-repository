'use strict';
var keywords = [];
var uniqueArray = [];
function Gallery(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
    keywords.push(this.keyword);

};

Gallery.prototype.render = function() {
    let template = $('#photo-template').clone();
    $('main').append(template);
    template.find('h2').text(this.title);
    template.find('img').attr('src',this.image_url);
    
    template.find('p').text(this.description);
    template.removeAttr('id');
    template.addClass(this.keyword);
    template.addClass('all');
    


    
    

};

function getUnique(array){
    
    
    // Loop through array values
    for( let i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    

}

function addOption (){
    // $('select').html('');
 console.log(uniqueArray);   
    for (let i = 0 ; i < uniqueArray.length; i++){
        var option = $('#option').clone();
        $('select').append(option);
        option.html(uniqueArray[i]);
        option.removeAttr('id');
        option.attr('value',uniqueArray[i]);

          
               
    }
    $('#select').on('change',function(){
        $('div').css({'display': 'none'});
       
        $('.'+this.value).css({'display': 'inline-block'})
    })

}


Gallery.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json', ajaxSettings).then((data) => {
        data.forEach((item) => {
            let horn = new Gallery(item);
            
            horn.render();
            

            
        });
        getUnique(keywords);
        
        addOption();
    });

};


$(() => Gallery.readJson());

