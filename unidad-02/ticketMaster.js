class TicketMaster {
    #precioBaseDeGanancia = 0.15
    #id = 1

    constructor(){
        this.eventos = []
    }

    getEventos = () => {
        return this.eventos
    }

    addEvent = (nombre, lugar, precio, capacidad = 50, fecha = new Date()) => {
        const precioFinal = precio + ( precio * this.#precioBaseDeGanancia)
        const nuevoEvento = {
            id,
            nombre: nombre,
            lugar: lugar,
            precio: precioFinal,
            capacidad,
            fecha,
            participantes: []
        }
        this.#id++;
        this.eventos.push(nuevoEvento)
        return nuevoEvento
    }

    addUser = (idEvento, idUsuario) => {
        const evento = this.eventos.find(event => event.id === idEvento)

        if(!evento) {
            return {error: 'No existe el evento'}
        }

        const usuarioRegistrado = evento.participantes.includes(idUsuario)
        if(usuarioRegistrado){
            return {error: 'El usuario ya esta registrado'}
        }

        evento.participantes.push(idUsuario)
        return {evento}
    }
}