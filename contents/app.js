

$('.craftml').each(function(){
    // var contents = $(this).html()
    console.log(this.innerHTML)
    var contents = _.unescape(this.innerHTML)
    console.log(contents)
    // var pre = $(this).children('pre')[0]
    // var str = (pre.innerText) ? pre.innerText : pre.textContent;
    // console.log(pre.innerHTML)

    React.render(<CraftApp contents={contents}/>,
       this
    )
})


// contents = $('#content1').html()
// React.render(<CraftApp contents={contents}/>,
//     document.getElementById('content1')
// )