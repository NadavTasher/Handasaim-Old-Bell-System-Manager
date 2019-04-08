<?php

include "accounts/api.php";

const belldbFile = "../../main/settings.json";
const audioDirectory = "../../rings/";
$belldb = json_decode(file_get_contents(belldbFile));

if (init() !== null) {
    if (isset($_POST["bell"])) {
        $result->success = false;
        $action = $_POST["bell"];
        if ($action === "upload") {
            if (isset($_POST["name"]) && isset($_POST["second"]) && isset($_POST["index"])) {
                $name = $_POST["name"];
                $second = $_POST["second"];
                $index = intval($_POST["index"], 10);
                move_uploaded_file($_FILES["audio"]["tmp_name"], audioDirectory . $name . ".mp3");
                for ($i = 0; $i < sizeof($belldb->queue); $i++) {
                    if ($i === $index) {
                        $belldb->queue[$i]->link = $name . ".mp3";
                        $belldb->queue[$i]->time = floatval($second);
                        $belldb->queue[$i]->md5 = md5_file(audioDirectory . $name . ".mp3");
                        $result->success = true;
                    }
                }
                file_put_contents(belldbFile, json_encode($belldb));
            }
        } else if ($action === "settings") {
            if (isset($_POST["mute"]) && isset($_POST["length"])) {
                $result->success = true;
                $belldb->length = intval($_POST["length"], 10);
                $belldb->mute = $_POST["mute"] === "true";
                file_put_contents(belldbFile, json_encode($belldb));
            }
        }
    }
}
echo json_encode($result);
