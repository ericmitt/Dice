cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device-motion/www/Acceleration.js",
        "id": "org.apache.cordova.device-motion.Acceleration",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-motion/www/accelerometer.js",
        "id": "org.apache.cordova.device-motion.accelerometer",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-motion/src/windows8/AccelerometerProxy.js",
        "id": "org.apache.cordova.device-motion.AccelerometerProxy",
        "merges": [
            ""
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device-motion": "0.2.10"
}
// BOTTOM OF METADATA
});