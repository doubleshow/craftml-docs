var React = require('react')
var ace = require('brace')
var _ = require('lodash')

require('brace/mode/html')
require('brace/theme/tomorrow')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            width: 200
        }
    },    


    componentDidMount: function() {

        var contents = this.props.contents
        contents = _.trim(contents)        

        console.log('didMount')
        var ed = this.refs.editor.getDOMNode()

        var editor = ace.edit(ed)
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
        editor.getSession().on('change', this.handleChange)
        this.setState({
            editor: editor
        })
        this.editor = editor     
        
        this.setState({width:this.getContentWidth()})        
    },

    handleChange: function(){
        if (this.props.onHeightChange && this.props.autoResize){            
            this.props.onHeightChange(this.getHeight())            
        }
        this.setState({width:this.getContentWidth()})
    },

    getValue: function() {        
        return this.editor.getValue()
    },

    getContentWidth: function(){
        var w = this.editor.getSession().getScreenWidth() * this.editor.renderer.characterWidth
        var gutterWidth = this.editor.renderer.$gutterLayer.gutterWidth  || 41
        w += gutterWidth
        return w
    },

    componentDidUpdate: function(){
        this.editor.resize()
    },

    getHeight: function() {        
        var h =
                  this.editor.getSession().getScreenLength()
                  * this.editor.renderer.lineHeight
                  + this.editor.renderer.scrollBar.getWidth()        
        return h
    },    

    render: function() {
        var style = {
            height: '100%',
            width: this.state.width,
            paddingRight: 30,
            //left: -300,   collapse
            background: 'rgba(240,240,240,0.15)'
        }

        return (<div className = "editor"
                ref = "editor"
                style = {style}>
               </div>)
    }
})