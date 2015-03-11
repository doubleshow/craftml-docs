

$('.craftml').each(function(){
    var contents = _.unescape(this.innerHTML)

    React.render(<CraftApp contents={contents}/>,
       this
    )
})
