const socket = io()
socket.on('connect', () => {
    console.log("connected");
    socket.on('newReport', (notification) => {
        console.log(notification);
    })

    socket.on('notification', (notification) => {
        console.log(notification);
    })
})