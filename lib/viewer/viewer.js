var THREE = require('./three.min.js')
require('./TrackballControls')
require('./STLLoader')

var Viewer = function(element) {
    this.renderer = null;
    this.controls = null;
    this.camera = null;
    this.scene = null;
    this.init(element);
};

//var keyboard = new KeyboardState();
var grids = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
];

Viewer.prototype = {
    constructor: Viewer,

    setCameraPosition: function(x, y, z) {
        this.camera.position.set(x, y, z);
    },

    clear: function() {
        this.initScene()
    },

    addCSG: function(csg) {

        // this.initScene();

        var loader = new THREE.STLLoader();

        var stlstring = csg.stl
        var geometry = loader.parse(stlstring)
        var material = new THREE.MeshPhongMaterial({
            ambient: 0xff5533,
            // color: 0xff5533,
            color: csg.color,
            specular: 0x111111,
            shininess: 200
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.render()
    },

    addCSGs: function(csgs) {

        this.initScene();

        var loader = new THREE.STLLoader();

        var self = this
        csgs.forEach(function(csg) {
            var stlstring = csg.stl
            var geometry = loader.parse(stlstring)
            var material = new THREE.MeshPhongMaterial({
                ambient: 0xff5533,
                // color: 0xff5533,
                color: csg.color,
                specular: 0x111111,
                shininess: 200
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0);
            mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            self.scene.add(mesh);
        })
    },

    setStl: function(stlstring) {
        var loader = new THREE.STLLoader();
        var geometry = loader.parse(stlstring);
        var material = new THREE.MeshPhongMaterial({
            ambient: 0xff5533,
            color: 0xff5533,
            specular: 0x111111,
            shininess: 200
        });
        if (this.mesh) {
            this.scene.remove(this.mesh)
        }
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    },

    // Viewer.prototype.addStl = function(stlstring) {
    //     var loader = new THREE.STLLoader();
    //     var geometry = loader.parse(stlstring);
    //     var material = new THREE.MeshPhongMaterial({
    //         ambient: 0xff5533,
    //         color: 0x333355,
    //         specular: 0x111111,
    //         shininess: 100,
    //         opacity: 0.2,
    //         transparent: true
    //     });
    //     var mesh = new THREE.Mesh(geometry, material);
    //     mesh.position.set(0, 0, 0);
    //     mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
    //     mesh.castShadow = true;
    //     mesh.receiveShadow = true;
    //     this.scene.add(mesh);
    // }

    initScene: function() {
        // New Scene
        this.scene = new THREE.Scene();
        this.scene.fog = this.fog;
        this.scene.add(this.camera);

        if (1) {
            //Grids

            var grid;
            //x - yz
            grid = new Grid(1, 0.05);
            //grid.material = new THREE.MeshBasicMaterial({transparent:true});
            grid.rotation.z = Math.PI / 2;
            this.scene.add(grid);

            //y - xz
            grid = new Grid(1, 0.05);
            //grid.material = new THREE.MeshBasicMaterial({transparent:true});
            grid.rotation.y = Math.PI / 2;
            grid.rotation.z = Math.PI / 2;
            this.scene.add(grid);

            //z - xy
            grid = new Grid(1, 0.05);
            //grid.material = new THREE.MeshBasicMaterial({transparent:true});
            grid.rotation.x = Math.PI / 2;
            this.scene.add(grid);

            var color = 0xBBBBBB;
            this.scene.children[1].material.color.setHex(color);
            this.scene.children[2].material.color.setHex(color);
            this.scene.children[3].material.color.setHex(color);

        }

        // Axis
        var axis;

        axis = new THREE.AxisHelper(1);
        axis.position.set(0.01, 0.01, 0.01);
        //axis.material = new THREE.MeshBasicMaterial({transparent:true});
        this.scene.add(axis);

        // Lights
        this.scene.add(new THREE.AmbientLight(0x777777));
        this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
        this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
        this.addShadowedLight(-1, -1, -1, 0xffaa00, 1);
    },

    init: function(element) {

        // this.container = document.getElementById(element);
        this.container = element
        this.fog = new THREE.Fog(0xffffff, 2, 15);


        if (0) {
            // Load STL (ASCII String)
            var loader = new THREE.STLLoader();
            var geometry = loader.parse(stlstring);
            var material = new THREE.MeshPhongMaterial({
                ambient: 0xff5533,
                color: 0xff5533,
                specular: 0x111111,
                shininess: 200
            });

            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0);
            // mesh.rotation.set( 0, - Math.PI / 2, 0 );
            // mesh.scale.set( 0.5, 0.5, 0.5 );
            mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
        }

        // Camera
        this.camera = new THREE.PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
        this.camera.position.set(0, -1, 0);

        // renderer
        if (window.WebGLRenderingContext) {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            })
        } else {
            this.renderer = new THREE.CanvasRenderer({
                preserveDrawingBuffer: true
            });
        }
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(this.fog.color, 1);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapCullFace = THREE.CullFaceBack;
        this.container.appendChild(this.renderer.domElement);


        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.2;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = false;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [65, 83, 68];

        var self = this;
        this.controls.addEventListener('start', function() {
            // turn on the animatation at the start of a trackball control event
            self.animateOn();
        });

        this.controls.addEventListener('end', function() {
            // turn off the animatation at the end of a trackball control event
            self.animateOff();
        });

        // stats
        // stats = new Stats();
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.top = '0px';
        // container.appendChild( stats.domElement );
        //
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.initScene();
    },

    addShadowedLight: function(x, y, z, color, intensity) {
        var directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z)
        this.scene.add(directionalLight);
        directionalLight.castShadow = true;
        // directionalLight.shadowCameraVisible = true;
        var d = 1;
        directionalLight.shadowCameraLeft = -d;
        directionalLight.shadowCameraRight = d;
        directionalLight.shadowCameraTop = d;
        directionalLight.shadowCameraBottom = -d;
        directionalLight.shadowCameraNear = 1;
        directionalLight.shadowCameraFar = 4;
        directionalLight.shadowMapWidth = 1024;
        directionalLight.shadowMapHeight = 1024;
        directionalLight.shadowBias = -0.005;
        directionalLight.shadowDarkness = 0.15;
    },

    onWindowResize: function() {
        console.debug("viewer resized:", this.container.clientWidth, this.container.clientHeight);
        this.controls.handleResize()
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.render(this.scene, this.camera);
    },

    // turn the animation on
    animateOn: function() {
        this.off = false;
        this.animate();
    },

    // turn the animation off
    animateOff: function() {
        this.off = true;
    },

    // animate continously, until it's turned off
    animate: function() {
        if (!this.off) {
            requestAnimationFrame(this.animate.bind(this));
        }

        // keyboard.update();

        // if(keyboard.pressed('f'))
        // {
        //     console.log("F\n");
        // }
        this.render();
    },

    render: function() {
        this.controls.update();

        //calculate the angle between camera and the 3 grids
        //multiply alpha for grids by their relative angle

        //                                     /
        //calculate camera direction vector   v
        var dir = [-this.camera.position.x, -this.camera.position.y, -this.camera.position.z];

        var length = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2) + Math.pow(dir[2], 2));

        dir[0] = dir[0] / length;
        dir[1] = dir[1] / length;
        dir[2] = dir[2] / length;

        for (var i = 0; i < grids.length; i++) {
            //                           /
            //calculate relative angle  v
            var alpha = Math.abs(grids[i][0] * dir[0] + grids[i][1] * dir[1] + grids[i][2] * dir[2]) / 4;
            if (alpha < 0.05) {
                this.scene.children[i + 1].visible = false;
            } else {
                this.scene.children[i + 1].visible = true;
            }
            //              /
            //assign alpha v
            this.scene.children[i + 1].material.opacity = alpha;
            this.scene.children[i + 1].needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
};

Grid = function(size, step) {

    var geometry = new THREE.Geometry();
    // var material = new THREE.MeshBasicMaterial({
    //     transparent: true
    // });

    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        transparent: true
    })

    this.color1 = new THREE.Color(0x444444);
    this.color2 = new THREE.Color(0x888888);

    for (var i = -size; i <= size + step; i += step) {

        geometry.vertices.push(
            new THREE.Vector3(-size, 0, i), new THREE.Vector3(size, 0, i),
            new THREE.Vector3(i, 0, -size), new THREE.Vector3(i, 0, size)
        );

        var color = i === 0 ? this.color1 : this.color2;

        geometry.colors.push(color, color, color, color);

    }

    THREE.Line.call(this, geometry, material, THREE.LinePieces);

};

Grid.prototype = Object.create(THREE.Line.prototype);
Grid.prototype.constructor = Grid;

module.exports = Viewer