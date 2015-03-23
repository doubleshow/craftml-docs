var React = require('react')
var Viewer = require('../viewer/viewer')

module.exports = React.createClass({

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