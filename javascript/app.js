function load() {
    view("login");
}

function login() {
    let form = new FormData();
    form.append("key", get("key").value);
    fetch("php/modify.php", {
        method: "post",
        body: form
    }).then(response => {
        response.text().then((result) => {
            let json = JSON.parse(result);
            if (json.hasOwnProperty("auth")) {
                if (json.auth) {
                    view("upload");
                } else {
                    alert("Login failed.");
                }
            }
        });
    });
}

function upload() {
    let form = new FormData();
    form.append("name", get("name").value);
    form.append("key", get("key").value);
    form.append("second", get("second").value);
    form.append("index", get("time").value);
    form.append("audio", get("file").files[0]);
    fetch("php/modify.php", {
        method: "post",
        body: form,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    }).then(response => {
        response.text().then((result) => {
            let json = JSON.parse(result);
            if (json.hasOwnProperty("success")) {
                if (json.success) {
                    out("Saved!");
                } else {
                    out("Not Saved");
                }
            }
        });
    });
    out("Upload started.");
}

function out(text){
    get("output").innerText=text;
    view("output");
}