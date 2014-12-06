//document.addEventListener("DOMContentLoaded", startGame, false);

(function () {

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
   // document.addEventListener("DOMContentLoaded", onDeviceReady, false);


    function onDeviceReady() {
        var p1 = document.getElementById("p1");
        p1.innerText = "onDeviceReady";
        Run3DScene();
    };

   
    function Run3DScene() {
        var p1 = document.getElementById("p1");

        document.addEventListener("click", onclick, false);
        function onclick() {
            p1.innerText = "Click  " + camera.position;

            //navigator.accelerometer.getCurrentAcceleration(accSuccess, accError);

            rdnDices();

        }

        function rdnDices() {
            var IMPULSE = 1.2;
            dice.isVisible = true;
            dice2.isVisible = true;

            dice.position = new BABYLON.Vector3(Math.random() * 20 - 10, 15, Math.random() * 10 - 5);
            dice2.position = new BABYLON.Vector3(Math.random() * 20 - 10, 15, Math.random() * 10 - 5);


            dice.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 3000, friction: 0.6, restitution: 0.3 });
            dice.applyImpulse(new BABYLON.Vector3(Math.random() * IMPULSE, Math.random() * IMPULSE, Math.random() * IMPULSE), new BABYLON.Vector3(0, 0, 0));

            dice2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 3000, friction: 0.6, restitution: 0.3 });
            dice2.applyImpulse(new BABYLON.Vector3(Math.random() * IMPULSE, Math.random() * IMPULSE, Math.random() * IMPULSE), new BABYLON.Vector3(0, 0, 0));


        }


        // Get the canvas element from our HTML below
        var canvas = document.getElementById("renderCanvas");
        // Load BABYLON 3D engine
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        // Creating a camera looking to the zero point (0,0,0), a light, and a sphere of size 1
        //var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 30, new BABYLON.Vector3(0, 0, 0), scene);
        //var camera = new BABYLON.OculusCamera("Camera", new BABYLON.Vector3(0, 0, -5), scene);
        //var camera = new BABYLON.VRDeviceOrientationCamera("Camera", new BABYLON.Vector3(0, 0, -10), scene);

        var camera = new BABYLON.VirtualJoysticksCamera("Camera", new BABYLON.Vector3(-2, 16, -49), scene);
        //var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 15, -50), scene);
        camera.fov = 45;

        var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 45, 0), scene);
        //var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 0, 0), scene);


        //var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 5, 0), scene);

        //light0.diffuse = new BABYLON.Color3(1, 0, 0);
        //light0.specular = new BABYLON.Color3(1, 1, 1);


      
        var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseTexture = new BABYLON.Texture("assets/stars2.jpg", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        groundMat.backFaceCulling = false;

        var boxMat = new BABYLON.StandardMaterial("boxMat", scene);
        boxMat.diffuseTexture = new BABYLON.Texture("assets/stars2.jpg", scene);
        boxMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        boxMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        boxMat.backFaceCulling = false;

        var materialSphere = new BABYLON.StandardMaterial("transparent", scene);
        materialSphere.alpha = 0.5;
        boxMat.backFaceCulling = false;

        var dice;// = BABYLON.Mesh.CreateBox("dice", 3, scene);;
        var dice2;// = BABYLON.Mesh.CreateBox("dice2", 3, scene);

        // Shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
        shadowGenerator.getShadowMap().renderList.push(dice);
        shadowGenerator.getShadowMap().renderList.push(dice2);

        // Physics
        scene.enablePhysics(null, new BABYLON.OimoJSPlugin(new BABYLON.Vector3(0, -9.81, 0)));

        BABYLON.SceneLoader.ImportMesh("", "assets/", "Dice.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            var d = newMeshes[0];
            d.rotation.y = 0;
            d.position = new BABYLON.Vector3(0, 30, 0);
            d.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
            d.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            //d.isVisible = false;
            dice = d;
        });

        BABYLON.SceneLoader.ImportMesh("", "assets/", "Dice.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            var d = newMeshes[0];
            d.rotation.y = 0;
            d.position = new BABYLON.Vector3(0, 30, 0);
            d.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
            d.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            d.isVisible = false;
            dice2 = d;
        });



        shadowGenerator.getShadowMap().renderList.push(dice);
        shadowGenerator.getShadowMap().renderList.push(dice2);


        // Playground
        var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
        ground.scaling = new BABYLON.Vector3(100, 1, 100);
        ground.position.y = -5.0;
        ground.checkCollisions = true;


        var roof = BABYLON.Mesh.CreateBox("Roof", 1, scene);
        roof.scaling = new BABYLON.Vector3(100, 1, 100);
        roof.position.y = 45.0;
        roof.checkCollisions = true;


        var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
        border0.scaling = new BABYLON.Vector3(1, 100, 100);
        border0.position.y = -5.0;
        border0.position.x = -50.0;
        border0.checkCollisions = true;


        var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
        border1.scaling = new BABYLON.Vector3(1, 100, 100);
        border1.position.y = -5.0;
        border1.position.x = 50.0;
        border1.checkCollisions = true;


        var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
        border2.scaling = new BABYLON.Vector3(100, 100, 1);
        border2.position.y = -5.0;
        border2.position.z = 50.0;
        border2.checkCollisions = true;


        var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
        border3.scaling = new BABYLON.Vector3(100, 100, 1);
        border3.position.y = -5.0;
        border3.position.z = -50.0;
        border3.checkCollisions = true;

        //var cylinder = BABYLON.Mesh.CreateCylinder("cynlinder1", 70, 65, 65, 10, 16, scene, true);
        //var cylinder = BABYLON.Mesh.CreateBox("cylinder", 1, scene);
        //cylinder.scaling = new BABYLON.Vector3(50, 50, 50);
        //cylinder.checkCollisions = true;
        //cylinder.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0));

        ground.material = groundMat;
        roof.material = groundMat;
        border0.material = boxMat;
        border1.material = boxMat;
        border2.material = boxMat;
        border3.material = boxMat;
        ground.receiveShadows = true;
        roof.receiveShadows = true;

        //cylinder.material = materialSphere;




        // Physics
        ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
        roof.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
        border0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border3.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        //cylinder.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 10000, friction: 0.6, restitution: 0.3 });


        // Attach the camera to the scene
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(canvas);
        var x = " ";

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
            //navigator.accelerometer.getCurrentAcceleration(accSuccess, accError);
            //p1.innerText = "Render " + x;
        });

        function accSuccess(acceleration) {

            x = acceleration.x + " " + acceleration.y;// + " " + acceleration.z;
        }

        function accError() {
            x = "error";
        }
    }
})();