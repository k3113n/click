class Service {
    constructor(url = "", onmessage = (n) => {}) {
        this.url = url;
        this.socket = null;
        this.update = onmessage;
        this.connected = false;
        if(url !== "") this.connect();
    }

    connect() {
        console.log("connecting...", "");
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.connected = true;
        }
        this.socket.onmessage = (event) => {
            console.log("message received: "+event.data);
            this.update(Number(event.data)||0);
        }
        this.socket.onclose = () => {
            this.connected = false;
            setTimeout(() => this.connect(), 3000);
        }
        this.socket.onerror = (event) => {
            console.log("error: "+event.message);
            //setTimeout(() => this.connect(), 3000);
        }
    }
    send(message) {
        console.log(message);
        if (this.socket && this.connected) {
            console.log("message sent: "+message);
            this.socket.send(message);
        }
    }
    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
    connected() {
        return (this.socket && this.readyState === WebSocket.OPEN);
    }
}

export default Service;