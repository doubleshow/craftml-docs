$('.craftml').each(function(){
    var contents = _.unescape($(this).find('.source')[0].innerHTML)

    React.render(<CraftApp contents={contents}/>,
       this
    )
})

// http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
var a = document.createElement("a");
document.body.appendChild(a);
a.style = 'display: none';