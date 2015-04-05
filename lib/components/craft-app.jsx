var React = require('react')
var CraftViewer = require('./craft-viewer')
var CraftEditor = require('./craft-editor')
var brcraft = require('../brcraft')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            useWorker: this.props.useWorker,
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
            .preview(code, context, {useWorker: this.state.useWorker})
            .then(function(results){
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


        brcraft
            .build(code, context, {useWorker: this.state.useWorker})
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

    didRender: function(result) {
        console.log('didRender',result)
        
        var viewer = this.refs.viewer

        var offset = {x:result.layout.size.x/2,y:result.layout.size.y/2,z:result.layout.size.z/2}

        // viewer.offset = offset
        // viewer.clear()
        viewer.initScene(offset)

        var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']
        result.csgs.forEach(function(r, index) {
            var stlstring = r.stl
            var csg = {
                color: colors[index % 6],
                stl: stlstring
            }

            viewer.add(csg, offset)
        })

        // var editorHeight = this.refs.editor.getHeight()
        this.setState({renderCommandText: 'Refresh'})//, editorHeight: editorHeight})        
        // console.log(editorHeight)
    },

    handleHeightChange: function(height){                
        if (this.props.autoResize){
            // console.log('height:', height)
            var h = Math.max(height, 200) + 0  // enforce min height
            this.setState({editorHeight:h})
            this.refs.viewer.setHeight(h)
        }
    },

    componentDidMount: function() {        
        this.doRender()
        var editorHeight = this.refs.editor.getHeight()
        this.handleHeightChange(editorHeight)
    },

    componentDidUpdate: function(){
        this.refs.viewer.refresh()
    },

    render: function() {

        var s1 = {   
            position: 'absolute',         
            top: 0,
            left: 0,            
            overflow: 'hidden',            
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

        if (this.state.editorHeight && this.props.autoResize){
            r.height = this.state.editorHeight
        }

        var n = {
            fontSize: '65%'
        }

        var a = {
            display: 'none'
        }

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
                    onHeightChange={this.handleHeightChange}
                    autoResize={this.props.autoResize}
                    onRefreshHotkey={this.doRender}/>
            </div>            
          </div>
        )
    }
})