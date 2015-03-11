var viewer = new Viewer('preview')
viewer.setCameraPosition(0, -2.5, 3)
viewer.render()

names.forEach(function(name, index) {

    var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']

    $.get('preview/' + name, function(data) {
        var csg = {
            color: colors[index % 6],
            stl: data
        }
        viewer.addCSG(csg)
    })
})