var React = require('react')
var ace = require('brace')
var _ = require('lodash')

require('brace/mode/html')
require('brace/theme/tomorrow')

module.exports = React.createClass({

    componentDidMount: function() {

        var contents = this.props.contents
        contents = _.trim(contents)
        // console.log(contents)

        console.log('didMount')
        var ed = this.refs.editor.getDOMNode()

        var editor = ace.edit(ed)
        // console.log(editor)
        var self = this
        editor.$blockScrolling = Infinity
        editor.setValue(contents, -1)
        editor.setTheme("ace/theme/tomorrow")
        editor.getSession().setMode("ace/mode/html")
        editor.getSession().setUseWorker(false)
        editor.commands.addCommand({
            name: "refresh",
            bindKey: {
                win: "Shift-Return",
                mac: "Shift-Return"
            },
            exec: function(editor) {
                console.debug('shift-return pressed')
                self.props.onRefreshHotkey()
            }
        })
        this.setState({
            editor: editor
        })
        this.editor = editor
    },

    getValue: function() {        
        // console.log(this.state)
        // return this.state.editor.getValue()
        console.log(this)
        return this.editor.getValue()
    },

    render: function() {
        var style = {
            height: '100%',
            background: 'rgba(240,240,240,0.15)'
        }

    return (<div className = "editor"
            ref = "editor"
            style = {style}>
           </div>)
    }
})