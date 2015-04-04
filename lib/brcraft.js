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
            console.log('worker doing preview')
            craft
                .preview(input.code, input.context)
                .then(function(solids) {                    
                    console.log('worker preview done', solids)
                    var csgs = _s(solids).csgs()
                    var result = {}
                    result.csgs = csgs.map(function(csg) {
                        return {
                            stl: csg.toStlString()
                        }
                    })
                    var s = solids[0]                    
                    result.layout = s.layout
                    callback(result)
                }).catch(function(err) {
                    console.log('error',err.stack)
                    callback('')
                })
        }
    }
})

function brcraft() {
    this.init()
}

brcraft.prototype.init = function() {
    return worker.first('hi')
}

brcraft.prototype.preview = function(code, context, options) {

    if (!options.useWorker) {

        return craft
            .preview(code, context)
            .then(function(solids) {
                console.log('worker preview done', solids)
                    var csgs = _s(solids).csgs()
                    var result = {}
                    result.csgs = csgs.map(function(csg) {
                        return {
                            stl: csg.toStlString()
                        }
                    })
                    var s = solids[0]                    
                    result.layout = s.layout
                return result
            })

    } else {

        return worker
            .craft({
                code: code,
                mode: 'preview',
                context: context
            })
    }
}

brcraft.prototype.build = function(code, context, options) {

    if (!options.useWorker) {

        return craft.build(code, context)
            .then(function(r) {
                console.log('worker build done', r)

                var result = r.toStlString()
                return result
            })

    } else {

        return worker
            .craft({
                code: code,
                mode: 'export',
                context: context
            })
    }
}

module.exports = new brcraft()