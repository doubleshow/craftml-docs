$('.craftml').each(function(){
    var contents = $(this).find('.source')[0].innerHTML
    craft.edit(this, contents)
})