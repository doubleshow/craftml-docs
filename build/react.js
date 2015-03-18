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

    return (<div className = "editor"
            ref = "editor"
            style = {style}>
           </div>)
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

    getInitialState: function() {
        // naming it initialX clearly indicates that the only purpose
        // of the passed down prop is to initialize something internally
        return {
            renderCommandText: 'Initializing ...',
            exportCommandText: 'Export'
        }
    },

    doRender: function() {
        this.setState({renderCommandText: 'Rendering ...'})

        var code = this.refs.editor.getValue()
        var self = this        
        var context = {
            basePath: window.location.href,
            origin: window.location.origin
        }

        this.worker
            .craft({code:code, mode:'preview', context: context})
            .then(function(results) {
                self.didRender(results)
            })
    },

    doExport: function(){
        this.setState({exportCommandText: 'Exporting ...'})

        var code = this.refs.editor.getValue()
        var self = this
        var context = {
            basePath: window.location.href,
            origin: window.location.origin
        }        

        this.worker
            .craft({code:code, mode:'export', context: context})
            .then(function(result) {
                self.didExport(result)
            })
    },

    didExport: function(result){
        //console.log('didExport',result)
        this.setState({exportCommandText: 'Export'})

        var blob = new Blob([result], {
            type: 'application/stla'
        })
        var blobURL = URL.createObjectURL(blob)

        var name = 'export.stl'
        a.download = name
        a.href = blobURL
        a.click()
        window.URL.revokeObjectURL(blobURL)
    },

    didRender: function(results) {
        console.log('didRender',results)
        var viewer = this.refs.viewer
        viewer.clear()

        var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']
        results.forEach(function(r, index) {
            var stlstring = r.stl //toStlString()
            var csg = {
                color: colors[index % 6],
                stl: stlstring
            }

            viewer.add(csg)
        })

        this.setState({renderCommandText: 'Render'})
    },

    componentDidMount: function() {
        // this.refresh()

        var worker = cw({
            sum:function(a,callback){
                callback(a[0]+a[1]);
            },
            square:function(a){
                return a*a;
            },
            first:function(a,callback){
                console.log('worker initialized')
                return callback(true)
            },            
            craft:function(input, callback){                
                importScripts('bundle.js')                
                if (input.mode === 'export'){
                    craft.build(input.code, input.context) 
                      .then(function(r) {                        
                        console.log('worker build done',r)
                        
                        var result = r.toStlString()
                        callback(result)
                    })
                } else {
                    craft
                    .preview(input.code, input.context)
                      .then(function(r) {                        
                        console.log('worker preview done',r)
                        
                        var results = r.csgs.map(function(csg){
                            return {
                                stl: csg.toStlString()
                            }
                        })
                    
                        callback(results)
                    }).catch(function(err){
                        callback(err)
                    })
                }                    
            }
        })
        
        this.worker = worker
        this.worker
            .first('hi')
            .then(this.doRender)
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
            right: 10
        }

        var r = {
            position: 'relative',
            height: '100%',
            border: '1px #999 solid'
        }

        var n = {
            fontSize: '65%'
        }

        // this.setState({renderCommandText: 'Craft'})

        return (          
          <div style={r}>
            <div style={s2}>                        
              <div style={b}>
                  <div className="button" onClick={this.doRender}>
                        <span>{this.state.renderCommandText}</span>                        
                        <br/><span className="button-caption">(shift-return)</span>
                  </div>
                  <div className="button" onClick={this.doExport}>
                        <span>{this.state.exportCommandText}</span>
                  </div>         
              </div>     
                <CraftViewer ref='viewer'/>
            </div>
            <div style={s1}>
                <CraftEditor ref='editor' 
                    contents={this.props.contents}
                    onRefreshHotkey={this.doRender}/>
            </div>            
          </div>
        )
    }
})