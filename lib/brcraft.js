var cw = require('catiline')
var worker = cw({
    first: function(a, callback) {
        console.log('worker initialized')
        return callback(true)
    },
    craft: function(input, callback) {
        importScripts('bundle.js')
        if (input.mode === 'export') {
            craft.build(input.code, input.context)
                .then(function(r) {
                    console.log('worker build done', r)

                    var result = r.toStlString()
                    callback(result)
                })
        } else {
            craft
                .preview(input.code, input.context)
                .then(function(r) {
                    console.log('worker preview done', r)

                    var results = r.csgs.map(function(csg) {
                        return {
                            stl: csg.toStlString()
                        }
                    })

                    callback(results)
                }).catch(function(err) {
                    callback(err)
                })
        }
    }
})

function brcraft() {
    // this.init()
}

brcraft.prototype.init = function() {
    return worker.first('hi')
}

brcraft.prototype.preview = function(code, context) {
    return worker
        .craft({
            code: code,
            mode: 'preview',
            context: context
        })
}

brcraft.prototype.build = function(code, context) {
    return worker
        .craft({
            code: code,
            mode: 'export',
            context: context
        })
}

module.exports = new brcraft()