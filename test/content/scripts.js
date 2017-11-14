(function () {
    const scene = new THREE.Scene();
    const renderer = getRenderer();

    initScene(document.getElementsByTagName('body')[0], scene, renderer);

    function initScene($container, scene, renderer) {
        const padding = 0;
        const windowSize = {
            width: $container.offsetWidth - padding,
            height: $container.clientHeight - padding
        };

        renderer.setSize(windowSize.width, windowSize.height);

        $container.appendChild(renderer.domElement);

        const object = getObjectMesh();
        const camera = getCamera(windowSize);

        new OrbitControl.default(camera, {});

        scene.background = new THREE.Color(0xffffff);

        scene.add(getLight());
        scene.add(camera);
        scene.add(object);

        render = render.bind(null, camera);
        render();

        function getCamera(windowSize) {
            const camera = new THREE.PerspectiveCamera(
                35,
                windowSize.width / windowSize.height,
                1,
                1000
            );

            camera.position.z = 100;

            return camera;
        }

        function getLight() {
            return new THREE.AmbientLight(0xffffff);
        }

        function getObjectMesh(name = 'custom-object') {
            const mesh = new THREE.Mesh(
                getGeometry(),
                getMaterial()
            );

            mesh.name = name;

            mesh.rotation.x = degreesToRadians(45);
            mesh.rotation.y = degreesToRadians(45);
            mesh.rotation.z = degreesToRadians(0);

            return mesh;

            function getGeometry() {
                return new THREE.BoxGeometry(20, 20, 20);
            }

            function getMaterial() {
                return new THREE.MeshLambertMaterial({
                    color: 0xdddddd,
                    wireframe: true
                });
            }

            function degreesToRadians(degrees) {
                return degrees * Math.PI / 180;
            }
        }
    }

    function render(camera) {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function getRenderer() {
        return window.WebGLRenderingContext ?
            new THREE.WebGLRenderer() :
            new THREE.CanvasRenderer();
    }
})();