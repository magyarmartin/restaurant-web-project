var names = [];
var prices = [];
var idx = 0;

setTimeout(function(){
    $('.alert-success').hide();
    $('.alert-danger').hide();
},3000)

function order(id){
    var name = $('#' + id + ' span').html();
    var price = $('#' + id + ' strong').text();
    $('#cart').show();
    names.push(name);
    prices.push(parseInt(price.substr(0,price.length)));
    
    $('#cartTable').append("<tr class='food' id='idx-"+idx+"'><td>"+name+"</td><td><strong>"+price+"</strong></td><td>"+
    "<button id='btnx-"+idx+"' class='plus-button'><span class='glyphicon glyphicon-trash'></span></button></td></tr>");
    $('#btnx-'+idx).attr('onclick', 'removeElement('+idx+')');
    $('.cart p span').text(getFullPrice());
    idx++;
}

function deleteAll(){
    names = [];
    idx = 0;
    $('.food').remove();
    $('#cart').hide();
};

function removeElement(index){
    var ind = names.indexOf($('#idx-'+index).html().split('<')[0]);
    names.splice(ind,1);
    prices.splice(ind,1);
    $('#idx-'+index).remove();
    if( names.length === 0 ){
        $('#cart').hide();
    }
    $('.cart p span').text(getFullPrice());
}

function send(parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");

    $.each(names, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });
    var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", 'fullPrice');
        field.attr("value", getFullPrice());

        form.append(field);

    $(document.body).append(form);
    form.submit();
}

function getFullPrice(){
    var sum = 0;
    for( var i in prices ){
        sum += prices[i];
    }
    return sum;
}
