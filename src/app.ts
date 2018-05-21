// Import nodejs modules
import { Socket } from "net";
// Import project modules
import { Config } from './config';
import { URCore } from "./Core/URCore";
import { Logger } from "./Tools/Logger";
// Import Extensions
import "./Tools/BufferExtension";
// -======================================================-

let host: string = Config.UR_IP;
let port: number = Config.UR_Port;

const socket = new Socket();

socket.connect(port, host);
Logger.Log("Client has been started.");

socket.on('connect', () => {
    Logger.Log("Connected to URController.");
});
socket.on('data', data => {

    if (!URCore.packet_check(data)) {
        Logger.Warn("Drop packet. [err_size_check]");
        return;
    }
    let arew = URCore.on_packet(data);
    if (!arew)
        return;
    Logger.Log(JSON.stringify(arew));
});
socket.on('disconnect', () => {
    Logger.Log("Disconnected.");
});


