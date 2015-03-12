var viewer

var CraftEditor = React.createClass({

    componentDidMount: function() {

        var contents = this.props.contents
        contents = _.trim(contents)
        // console.log(contents)

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
        this.setState({
            editor: editor
        })
        //$(ed).height(100)
    },

    getValue: function() {
        return this.state.editor.getValue()
    },

    render: function() {
        var style = {
            height: '100%',
            background: 'rgba(240,240,240,0.15)'
        }

        return (
                <div className="editor"
                    ref="editor"
                    style={style}>
                </div>
        )
    }
})

var CraftViewer = React.createClass({

    componentDidMount: function() {
        var v = this.refs.viewer.getDOMNode()
        this.viewer = new Viewer(v)
        this.viewer.setCameraPosition(0, -2.5, 3)
        this.viewer.render()
    },

    add: function(csg) {
        this.viewer.addCSG(csg)
    },

    clear: function() {
        this.viewer.clear()
    },

    render: function() {
        var style = {
            height: '100%'
        }

        return ( <div className="viewer"
                    ref="viewer"
                    style={style}>
                 </div>
        )
    }
})

var CraftApp = React.createClass({

    refresh: function(){        
        var code = this.refs.editor.getValue()
        var viewer = this.refs.viewer

        craft
            .preview(code)
            .then(function(r) {
            
                viewer.clear()
                
                var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']

                r.csgs.forEach(function(csg, index) {
                    var stlstring = csg.toStlString()
                    var csg = {
                        color: colors[index % 6],
                        stl: stlstring
                    }
                    
                    viewer.add(csg)
                })
            })
    },

    componentDidMount: function(){
        this.refresh()
    },

    render: function() {   

        var s1 = {
            top: 0,
            left: 0,
            width: '50%',
            height: '100%'        
        }
        var s2 = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
        }
        var b = {
            position: 'inherit',
            margin: 5,            
            right: 50
        }

        var r = {
            position: 'relative',
            height: '100%',
            border: '1px #999 solid'
        }

        var n = {
            fontSize: '65%'
        }

        return (          
          <div style={r}>
            <div style={s2}>            
              <div className="button" onClick={this.refresh} style={b}>
                    <span>Craft</span>
              </div>
                <CraftViewer ref='viewer'/>
            </div>
            <div style={s1}>
                <CraftEditor ref='editor' 
                    contents={this.props.contents}
                    onRefreshHotkey={this.refresh}/>
            </div>            
          </div>
        )
    }
})