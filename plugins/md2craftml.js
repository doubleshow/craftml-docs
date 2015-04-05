var _ = require('lodash'),
    jade = require('jade'),
    marked = require('marked')

module.exports = function(markdown){
    
    var text = ' ' + markdown
    var toks = text.split('```')
    var text = toks.map(function(tok, index){

        if (index % 2 && tok.match(/^craftml/)){

            var header = tok.split('\n')[0]
            // e.g.,
            // def = craftml(useWorker=true)
            // def = craftml
            var options = header.split(' ')[1]
            var attribs = ''
            if (options){
                console.log('p',options)
                eval('var o = ' + options)
                attribs = _.map(o, function(val, key){
                    return key + '=' + '"' + val + '"'
                }).join(' ')                
                console.log(attribs)
            }

            var contents = tok.split('\n').slice(1).join('\n')
            // var xml = _.escape('\n' + contents)
            var xml = '<!--\n' + contents + '  -->'
            var tag = jade.render('div.craftml(' + attribs + ')!=p', {p:xml})
            return tag

        } else {

            return marked(tok)
        }
    }).join('')
    console.log(text)
    return text
}