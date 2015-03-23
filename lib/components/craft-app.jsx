var React = require('react')
var CraftViewer = require('./craft-viewer')
var CraftEditor = require('./craft-editor')
var brcraft = require('../brcraft')

module.exports = React.createClass({

    getInitialState: function() {
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

        brcraft
            .preview(code, context)
            .then(function(results){
                self.didRender(results)
            })

        // if (0){
        //     console.log(craft.d)
        //     craft
        //         .preview(code, context)
        //         .then(function(r){
        //             console.log(r)
        //             var results = r.csgs.map(function(csg){
        //                     return {
        //                         stl: csg.toStlString()
        //                     }
        //                 })
        //             console.log(results)
        //             self.didRender(results)
        //         })

        // }else{

        //     // this.worker
        //     //     .craft({code:code, mode:'preview', context: context})
        //     //     .then(function(results) {
        //     //         self.didRender(results)
        //     //     })
        // }
    },

    doExport: function(){
        this.setState({exportCommandText: 'Exporting ...'})

        var code = this.refs.editor.getValue()
        var self = this
        var context = {
            basePath: window.location.href,
            origin: window.location.origin
        }        


        brcraft
            .build(code, context)
            .then(function(result){
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

        var a = this.refs.download.getDOMNode()
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
        this.doRender()
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

        var a = {
            display: 'none'
        }

        // this.setState({renderCommandText: 'Craft'})

        return (          
          <div style={r}>
            <a ref="download" style={a}/>
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