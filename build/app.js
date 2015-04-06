$('.craftml').each(function(){    
    // var contents = $(this).find('.source')[0].innerHTML    
    var s = $(this).html()
    // unwrap comment to obtain the script conents
    var m = s.match(/<!--\s*([^]*)\s*-->/)
    var contents = m ? m[1] : ''

    var useWorker = !($(this).attr('useWorker') == 'false')
    var autoResize = !($(this).attr('autoResize') == 'false')
    craft.edit(this, {contents: contents, useWorker: useWorker, autoResize: autoResize})
})