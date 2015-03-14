var _ = require('lodash')

module.exports = function(markdown){

    var text = ' ' + markdown
    var toks = text.split('```')
    var text = toks.map(function(tok, index){


        if (index % 2 && tok.match(/^craftml\n/)){

            return '<div class="craftml"><div class="source">\n'
                + _.escape(tok.replace(/^craftml\n/,''))
                + '</div></div>'
        } else{

            return tok
        }
    }).join('')

    console.log(text)
    return text
}