$('.craftml').each(function(){
    var contents = $(this).find('.source')[0].innerHTML
    var useWorker = !($(this).attr('useWorker') == 'false')
    craft.edit(this, {contents: contents, useWorker: useWorker})
})