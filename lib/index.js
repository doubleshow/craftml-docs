var React = require('react')
var _ = require('lodash')
var CraftApp = require('./components/craft-app.jsx')

craft = {}
craft.edit = function(element, contents) {
    var unescaped_contents = _.unescape(contents)
    var app = React.createElement(CraftApp, {
        contents: unescaped_contents
    })
    React.render(app, element)
}
 