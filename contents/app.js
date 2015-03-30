$('.craftml').each(function(){
    var contents = $(this).find('.source')[0].innerHTML
    var useWorker = !($(this).attr('useWorker') == 'false')
    var autoResize = !($(this).attr('autoResize') == 'false')
    craft.edit(this, {contents: contents, useWorker: useWorker, autoResize: autoResize})
})