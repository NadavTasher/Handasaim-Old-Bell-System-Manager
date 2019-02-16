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
    let reader = new FileReader();
    reader.readAsText(get("file").files[0], "UTF-8");
    reader.onload = function (evt) {
        let form = new FormData();
        form.append("audio", btoa(evt.target.result));
        form.append("name", get("name").value);
        form.append("key", get("key").value);
        form.append("second", get("second").value);
        form.append("index", get("time").value);
        fetch("php/modify.php", {
            method: "post",
            body: form
        }).then(response => {
            response.text().then((result) => {
                let json = JSON.parse(result);
                if (json.hasOwnProperty("success")) {
                    if (json.success) {
                        alert("Saved!");
                    } else {
                        alert("Not Saved");
                    }
                }
            });
        });
    };
}