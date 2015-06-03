/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var mapOrientation = 0;
var lightstate = false;

function rotateMapRight(){
        mapOrientation += 10;
      $('#map').animate({rotate: mapOrientation}, 0); 
      window.plugins.toast.show('Current Map Orientation: ' + mapOrientation ,'short','center',false);
}

function rotateMapLeft(){
        mapOrientation -= 10;
      $('#map').animate({rotate: mapOrientation}, 0);
      window.plugins.toast.show('Current Map Orientation: ' + mapOrientation ,'short','center',false); 
}

function flashlightToggle()
{
        //window.plugins.flashlight.switchOn(success,fail,false);
        window.plugins.flashlight.toggle(success,fail,false);
        //window.plugins.toast.show('flashlight toggled','short','center',false);   
    if(lightstate)
    {
        window.plugins.toast.show('light off','short','center',false);
        lightstate = false;
    }else
    {
        window.plugins.toast.show('light on','short','center',false);
        lightstate = true;
    }
}
function success()
{
    console.log("Success");
}
function fail()
{
    console.log("Fail");
}

 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        $("#info").html('Cordova Version: ' + device.cordova + '<br>');
        $("#info").append(device.model + '<br>');
        $("#info").append(device.platform + ' ' + device.version + '<br>');


        function onSuccessCompass(heading){
            $("#compass").html('Hading: ' + Math.round(heading.magneticHeading) + ' Degrees');
        };

        function onErrorCompass(compassError){
            alert('Compass error: ' + compassError.code);
        };

        var options = {frequency:50};

        var watcher01 = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);



    }



};
