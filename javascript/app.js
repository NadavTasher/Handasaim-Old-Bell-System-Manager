let mute = false;

function load() {
    loadSettings();
    if (isLoggedIn()) {
        view("postlogin");
        view("home");
    }
}

function flipMute() {
    mute = !mute;
    get("mute").innerText = mute ? "Unmute" : "Mute";
}

function loadSettings() {
    fetch("php/settings.php", {
        method: "get",
    }).then(response => {
        response.text().then((result) => {
            let json = JSON.parse(result);
            mute = json.mute;
            get("mute").innerText = mute ? "Unmute" : "Mute";
            get("length").value = json.length;
        });
    });
}

function saveSettings() {
    let form = fillForm();
    form.append("bell", "settings");
    form.append("length", get("length").value);
    form.append("mute", mute);
    fetch("php/modify.php", {
        method: "post",
        body: form,
    }).then(response => {
        response.text().then((result) => {
            let json = JSON.parse(result);
            if (json.hasOwnProperty("success")) {
                if (json.success) {
                    out("Saved!");
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 3000);
                } else {
                    out("Not Saved");
                }
            }
        });
    });
    out("Save started.");
}

function upload() {
    let form = fillForm();
    form.append("bell", "upload");
    form.append("name", get("name").value);
    form.append("second", get("second").value);
    form.append("index", get("time").value);
    form.append("audio", get("file").files[0]);
    if (get("name").value.length > 0 && get("second").value.length > 0 && get("time").value.length > 0) {
        fetch("php/modify.php", {
            method: "post",
            body: form,
        }).then(response => {
            response.text().then((result) => {
                let json = JSON.parse(result);
                if (json.hasOwnProperty("success")) {
                    if (json.success) {
                        out("Saved!");
                        setTimeout(() => {
                            view("upload");
                        }, 3000);
                    } else {
                        out("Not Saved");
                    }
                }
            });
        });
        out("Upload started.");
    }
}

function out(text) {
    get("output").innerText = text;
    view("output");
}