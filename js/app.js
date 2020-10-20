'use strict';
var keywords = [];
var uniqueArray = [];
var allPictures = [];
var currentPage =1;

function Gallery(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
    keywords.push(this.keyword);
    allPictures.push(this);

};

Gallery.prototype.renderIt = function () {
    // let template = $('#photo-template').clone();
    // $('main').append(template);
    // template.find('h2').text(this.title);
    // template.find('img').attr('src',this.image_url);
    // template.find('p').text(this.description);
    // template.removeAttr('id');

    // template.addClass(this.keyword);
    // template.addClass('all');
    // $('.all').css({'display': 'inline-block'});

    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);

    return html;
};

function getUnique(array) {

    // Loop through array values
    for (let i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }

}

function addOption() {

    $('select').append('<option value="all" id="option">All pictures</option>');

    for (let i = 0; i < uniqueArray.length; i++) {

        var option = $('#option').clone();
        $('select').append(option);
        option.html(uniqueArray[i]);
        option.removeAttr('id');
        option.attr('value', uniqueArray[i]);

    }
    $('#select').on('change', function () {
        $('div').css({ 'display': 'none' });

        $('.' + this.value).css({ 'display': 'inline-block' })
    })

}

function forSorting1(arr) {
    arr.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        }
        return 0;
    })
    return arr;
};
function forSorting2(arr) {
    arr.sort((a, b) => {
        if (a.horns < b.horns) {
            return -1;
        } else if (a.horns > b.horns) {
            return 1;
        }
        return 0;
    })
    return arr;
};



Gallery.readJson1 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json', ajaxSettings).then((data) => {

            forSorting1(data);

        data.forEach((item) => {
            let horn = new Gallery(item);
            $('#allItems').append(horn.renderIt());
        });
        getUnique(keywords);
        addOption();
    });

};

Gallery.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-2.json', ajaxSettings).then((data) => {

        forSorting1(data);

        data.forEach((item) => {
            let horn = new Gallery(item);
            $('#allItems').append(horn.renderIt());
        });
        getUnique(keywords);
        addOption();
    });

};


$(() => Gallery.readJson1());

function page1() {
    $('.all').remove();
    keywords = [];
    uniqueArray = [];
    $('option').remove();
    Gallery.readJson1();

    currentPage =1;
}

function page2() {
    $('.all').remove();
    keywords = [];
    uniqueArray = [];
    $('option').remove();
    Gallery.readJson2();

    currentPage =2;

}




function sort1(){
    var currentSort =document.getElementById("select").value;

    if(currentPage == 1){
        $('.all').remove();
        keywords = [];
        uniqueArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    
                forSorting1(data);
    
            data.forEach((item) => {
                let horn = new Gallery(item);
                $('#allItems').append(horn.renderIt());
            });
            getUnique(keywords);
            addOption();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    
    }

    if(currentPage == 2){
        $('.all').remove();
        keywords = [];
        uniqueArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    
                forSorting1(data);
    
            data.forEach((item) => {
                let horn = new Gallery(item);
                $('#allItems').append(horn.renderIt());
            });
            getUnique(keywords);
            addOption();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    
    } 
}


function sort2(){
    var currentSort =document.getElementById("select").value;

    if(currentPage == 1){
        $('.all').remove();
        keywords = [];
        uniqueArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    
                forSorting2(data);
    
            data.forEach((item) => {
                    let horn = new Gallery(item);
                    $('#allItems').append(horn.renderIt());
        
            });
            getUnique(keywords);
            addOption();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });

    }

    if(currentPage == 2){
        $('.all').remove();
        keywords = [];
        uniqueArray = [];
        $('option').remove();
        



        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    
                forSorting2(data);
    
            data.forEach((item) => {
                let horn = new Gallery(item);
                $('#allItems').append(horn.renderIt());
            });
            getUnique(keywords);
            addOption();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    } 


    

}