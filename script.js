/* TODO
 * add slider params
 * fix position shift by int vs double in slider
 * headings in config output 
 */

document.addEventListener("DOMContentLoaded", function(){
    var settings = {
        mouse: [
            {name: "m_rawinput", type: "check"},
            {name: "sensitivity", type: "slider", min: 0, max: 10, step: 0.1},
        ],
        gameplay: [
            {name: "cl_autowepswitch", type: "check"},
        ],
        interface: [
            {name: "cl_show_team_equipment", type: "check"},
            {name: "cl_showloadout", type: "check"},
            {name: "net_graph", type: "check"},
            {name: "net_graphheight", type: "number"},
            {name: "cl_righthand", type: "check"},
            {name: "viewmodel_fov", type: "slider", min: 54, max: 68, step: 0.01},
        ],
        crosshair: [
            {name: "cl_crosshairsize", type: "number"},
            {name: "cl_crosshairstyle", type: "drop", options: [0,1,2,3,4]},
            {name: "cl_crosshaircolor", type: "drop", options: [0,1,2,3,4,5]},
            {name: "cl_crosshair_drawoutline", type: "check"},
            {name: "cl_crosshair_outlinethickness", type: "slider", min: 0.5, max: 3, step: 0.5},
            {name: "cl_crosshairalpha", type: "slider", min: 0, max: 255, step: 1},
            {name: "cl_crosshairdot", type: "check"},
            {name: "cl_crosshairgap", type: "number"}
        ],
        radar: [
            {name: "cl_radar_always_centered", type: "check"},
            {name: "cl_radar_scale", type: "slider", min: 0, max: 10, step: 0.1},
            {name: "cl_radar_rotate", type: "check"}
        ],
        voice: [
            {name: "voice_enable", type: "check"},
            {name: "voice_scale", type: "slider", min: 0, max: 1, step: 0.1}
        ],
        performance: [
            {name: "fps_max", type: "number"},
            {name: "cl_forcepreload", type: "check"}
        ]
    };
    
    var settingsForm = document.getElementById("settings-wrapper").getElementsByTagName("form")[0];

    for(category in settings){
        //create category heading
        var icon = "";
        switch(category){
            case "mouse":
                icon = "fas fa-mouse-pointer"; 
                break;
            case "gameplay":
                icon = "fas fa-gamepad"; 
                break;
            case "interface":
                icon = "fas fa-desktop"; 
                break;
            case "crosshair":
                icon = "fas fa-crosshairs"; 
                break;
            case "radar":
                icon = "fas fa-street-view"; 
                break;
            case "voice":
                icon = "fas fa-microphone"; 
                break;
            case "performance":
                icon = "fas fa-chart-area"; 
                break;
        }
        var heading = document.createElement("h4");
        heading.innerHTML += '<i class="' + icon + '"></i>'
        heading.innerHTML += category.charAt(0).toUpperCase() + category.substr(1);
        settingsForm.appendChild(heading);

        //create setting-cat class div
        var catdiv = document.createElement("div");
        catdiv.className = "setting-cat";
        settingsForm.appendChild(catdiv);

        //add settings
        for(let setting of settings[category]){
            var module = document.createElement("div");
            module.className = "setting";

            var enabled = document.createElement("input");
            enabled.setAttribute("type", "checkbox");
            enabled.className = "enabled";

            var label = document.createElement("label");
            label.innerHTML = setting.name;

            var input = null;
            var output = null;
            switch(setting.type){
                case "check":
                    input = document.createElement("input");
                    input.setAttribute("type", "checkbox");
                    break;
                case "number":
                    input = document.createElement("input");
                    input.setAttribute("type", "number");
                    input.setAttribute("step", "0.1");
                    break;
                case "drop":
                    input = document.createElement("select");
                    for( val in setting.options ) {
                        var option = document.createElement("option");
                        option.innerHTML = val; 
                        input.appendChild(option);
                    }
                    break;
                case "slider":
                    input = document.createElement("input");
                    input.setAttribute("type", "range");
                    input.setAttribute("value", setting.max);
                    input.setAttribute("min", setting.min);
                    input.setAttribute("max", setting.max);
                    input.setAttribute("step", setting.step);

                    input.oninput = function() {
                        this.nextSibling.value = Number(this.value).toFixed(1);
                    };

                    output = document.createElement("output");
                    output.id = setting.name + "_output";
                    output.innerHTML = input.value;

                    break;
            }


            input.name = setting.name;
            input.className = "input";
            
            module.appendChild(enabled);
            module.appendChild(label);
            module.appendChild(input);
            if(output) {module.appendChild(output);}
            catdiv.appendChild(module);
        }
    }

    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("value", "Generate Config");
    submit.onclick = function() {
        var textarea = document.getElementsByTagName("textarea")[0];
        textarea.value = "";

        var inputs = document.getElementsByClassName("input");

        for (var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            var enabled = input.parentElement.getElementsByTagName("input")[0].checked; 

            if (!enabled) { continue; }

            var value;
            if(input.getAttribute("type") == "checkbox"){
                value = Number(input.checked);
            }
            else {
                value = input.value;
            }

            textarea.value += input.name + ' "' + value + '"' + '\n';
        }
    };

    settingsForm.appendChild(submit);
});
