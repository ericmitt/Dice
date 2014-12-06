//document.addEventListener("DOMContentLoaded", startGame, false);

(function () {

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
   // document.addEventListener("DOMContentLoaded", onDeviceReady, false);


    function onDeviceReady() {
       Msg("Alea Jacta Est");
   
       Run3DScene();
    };

    function Msg(msg) {
        var p1 = document.getElementById("p1");
        p1.innerText = msg;
    }

   
    

    function Run3DScene() {
        document.addEventListener("click", onclick, false);

        navigator.accelerometer.watchAcceleration(accSuccess, accError, { frequency: 300 });

        var twoDice = true;

        function onclick() {
            //Msg("Camera position " + camera.position );
            
            if (twoDice == true) {
                twoDice = false
            }
            else {
                twoDice = true;
            }
            rdnDices();
        }
        
        


    function rdnDices() {
            var IMPULSE = 1.8;
            dice.isVisible = true;
            if (twoDice) {
                dice2.isVisible = true;
            }
            else {
                dice2.isVisible = false;
            }
            dice.position = new BABYLON.Vector3(Math.random() * 20 - 10, 20, Math.random() * 20 - 5);
            dice2.position = new BABYLON.Vector3(Math.random() * 20 - 10, 20, Math.random() * 20 - 5);

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

       //camera
        var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 36, -49.5), scene);
        //camera.fov = 1.80;
        camera.rotation = new BABYLON.Vector3(.7,0,0);
        
        //light
        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 0, 0), scene);
        light0.diffuse = new BABYLON.Color3(1, 1, 1);
        light0.specular = new BABYLON.Color3(1, 1, 1);

        //texture
        var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseTexture = new BABYLON.Texture("assets/tapis.jpg", scene);
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

        //Dices
        var dice;
        var dice2;

        BABYLON.SceneLoader.ImportMesh("", "assets/", "Dice.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            var d = newMeshes[0];
            d.rotation.y = 0;
            d.position = new BABYLON.Vector3(0, 30, 0);
            d.scaling = new BABYLON.Vector3(5, 5, 5);
            d.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            d.isVisible = false;
            dice = d;
        });

        BABYLON.SceneLoader.ImportMesh("", "assets/", "Dice.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            var d = newMeshes[0];
            d.rotation.y = 0;
            d.position = new BABYLON.Vector3(0, 30, 0);
            d.scaling = new BABYLON.Vector3(5,5,5);
            d.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            d.isVisible = false;
            dice2 = d;
        });

        // Physics
        scene.enablePhysics(null, new BABYLON.OimoJSPlugin(new BABYLON.Vector3(0, -9.81, 0)));

        // Shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
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
        border0.position.x = -18.0;
        border0.checkCollisions = true;


        var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
        border1.scaling = new BABYLON.Vector3(1, 100, 100);
        border1.position.y = -5.0;
        border1.position.x = 18.0;
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


        ground.material = groundMat;
        roof.material = groundMat;
        border0.material = boxMat;
        border1.material = boxMat;
        border2.material = boxMat;
        border3.material = boxMat;
        ground.receiveShadows = true;
        roof.receiveShadows = true;

        

        // Physics
        scene.enablePhysics(null, new BABYLON.OimoJSPlugin(new BABYLON.Vector3(0, -9.81, 0)));


        // Physics
        ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
        roof.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
        border0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
        border3.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
       

        // Attach the camera to the scene
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        var lastAccX, lastAccY, lastAccZ;
        var cpt = 0;
        function accSuccess(acceleration) {
            cpt++;
            if (cpt > 1)
            { cpt = 1 }
            else {
                lastAccX = acceleration.x;
                lastAccY = acceleration.y;
                lastAccZ = acceleration.z;
            }
            //Msg("Acc " + acceleration.x + " " + acceleration.y);// + " " + acceleration.z;

            //if (Math.abs( acceleration.x ) > .6 ||  Math.abs( acceleration.z ) > .6) {  
            //    rdnDices();
            //}

            //dice.applyImpulse(new BABYLON.Vector3(acceleration.x, 0, acceleration.z), new BABYLON.Vector3(0, 0, 0));

            if (Math.abs(lastAccX - acceleration.x) > .6 || Math.abs(lastAccY - acceleration.y) > .6) {
                Msg("Alea Jacta Est");
                rdnDices();
            }
            lastAccX = acceleration.x;
            lastAccY = acceleration.y;
            lastAccZ = acceleration.z;
        }

        function accError() {
            Msg( "error accelerometer");
        }
    }
})();