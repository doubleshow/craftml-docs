var _ = require('lodash')

module.exports = function(markdown){

    var text = ' ' + markdown
    var toks = text.split('```')
    return toks.map(function(tok, index){


        if (index % 2 && tok.match(/^craftml\n/)){

            return '<div class="craftml">'
                + _.escape(tok.replace(/^craftml\n/,''))
                + '</div>'
        } else{

            return tok
        }
    }).join('')

}