var React = require('react')
var Viewer = require('../viewer/viewer')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            height: '100%'            
        }
    },    

    componentDidMount: function() {
        var v = this.refs.viewer.getDOMNode()
        this.viewer = new Viewer(v)
        this.viewer.setCameraPosition(0, -2.5, 3)
        this.viewer.render()
    },

    add: function(csg, offset) {
        this.viewer.addCSG(csg, offset)
    },

    initScene: function(offset) {
        this.viewer.initScene(offset)
    },

    setHeight: function(height){
        this.setState({height:height})
        this.viewer.onWindowResize()
    },

    refresh: function(){
        this.viewer.onWindowResize()
    },

    render: function() {
        var style = {
            height: '100%'
        }

        if (this.state.height){
            style.height = this.state.height// >= 200 ? this.state.height : 200
        }

        return ( <div className="viewer"
                    ref="viewer"
                    style={style}>
                 </div>
        )
    }
})