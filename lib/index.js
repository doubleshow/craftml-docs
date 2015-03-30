var React = require('react')
var _ = require('lodash')
var CraftApp = require('./components/craft-app.jsx')

if (typeof craft == 'undefined'){
    craft = {}
}

craft.edit = function(element, options) {
    var unescaped_contents = _.unescape(options.contents)
    var app = React.createElement(CraftApp, {
        contents: unescaped_contents,
        useWorker: options.useWorker,
        autoResize: options.autoResize
    })    
    React.render(app, element)
}