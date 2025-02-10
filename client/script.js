const socket = io()
socket.on('connect', () => {
    socket.on('notification', (notification) => {
        console.log(notification);
    })
})