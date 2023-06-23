const socket = io()

socket.emit(
  'primer conexion',
  {
    name: 'christiann',
    age: 29
  }
)