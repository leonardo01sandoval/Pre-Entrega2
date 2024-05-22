class Persona { 
    constructor(nombre, apellido, correo, fechaNacimiento, rut, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.rut = rut;
        this.contrasena = contrasena;
    }
}
//clase cuenta realizar retiro, deposito, consultar saldo, consultar movimientos.
class Cuenta {
    constructor(persona, saldo) {
        this.persona = persona;
        this.saldo = saldo;
        this.movimientos = [];
        // al crear cuenta. es el primer movimiento 
        this.movimientos.push({
            tipo: "deposito",
            monto: saldo,
            fecha: new Date(),
        })
    }
    realizarRetiro(monto) {
        if (monto > this.saldo) {
            return "Saldo insuficiente";
        } else {
            this.saldo -= monto;
            this.movimientos.push({
                tipo: "Retiro",
                monto: monto,
                fecha: new Date(),
                saldo: this.aldo
            });
            return "Retiro realizado. Nuevo saldo: " + this.saldo;
        } 
    }

    realizarDeposito(monto) {
        if (monto > 0) {
            this.saldo += monto;
            this.movimientos.push({
                tipo: "Depósito",
                monto: monto,
                fecha: new Date(),
                saldo : this.saldo
            });
            return "Depósito realizado. Nuevo saldo: " + this.saldo;
        } else {
            return "Monto de depósito no válido";
        }
    }

    consultarSaldo() {
        return "Saldo actual: " + this.saldo;
    }

    consultarMovimientos() {
        return this.movimientos;
    }

    filtrarMovimiento(criterio){
        return this.movimientos.filter(criterio);
    }
}
//clase banco, agregar cuentas, validar acceso y contraseña,  eliminar cuenta
class Banco {
    constructor() {
        this.cuentas = {}; 
    }

    agregarCuenta(persona, saldoInicial) {
        if (this.cuentas[persona.correo]) {
            console.log(`${persona.nombre} ya tiene una cuenta en el banco.`);
            return;
        }
        const nuevaCuenta = new Cuenta(persona, saldoInicial);
        this.cuentas[persona.correo] = nuevaCuenta;
        console.log(`Se ha creado la cuenta para ${persona.nombre}.`);
    }

    obtenerCuenta(correo) {
        return this.cuentas[correo]; // buscar la cuenta mediante correo electrónico
    }

    validarUsuario(correo) {
        return this.cuentas.hasOwnProperty(correo); // Verifica si el correo esta en las cuentas
    }

    validarContraseña(correo, contrasena) {
        if (this.validarUsuario(correo)) {
            return this.cuentas[correo].persona.contrasena === contrasena; // Verifica la contraseña
        }
        return false;
    }

    eliminarCuenta(correo) {
        if (this.validarUsuario(correo)) {
            delete this.cuentas[correo]; // Elimina la cuenta asociada al correo
            console.log(`Se ha eliminado la cuenta asociada a ${correo}.`);
        } else {
            console.log(`No se encontró una cuenta asociada a ${correo}.`);
        }
    }
}
// inicio de sistema
function iniciarSistemaBancario() { //validar correo 
    const correoIngresado = prompt("Ingrese su correo electrónico:");
    if (banco.validarUsuario(correoIngresado)) {
        let intentosIngreso = 4;
        while (intentosIngreso > 0) { //validar contraseña
            const contrasenaIngresada = prompt("Ingrese su contraseña:");
            if (banco.validarContraseña(correoIngresado, contrasenaIngresada)) {
                alert("¡Bienvenido " + correoIngresado + "!");
                bancoMovimientos(banco, correoIngresado); // se ingresar a los movimientos
                break;
            } else {
                intentosIngreso--;
                if (intentosIngreso === 0) {
                    alert("Ha superado el número de intentos. Por favor, inténtelo más tarde.");
                    break;
                } else {
                    alert("Contraseña incorrecta. Intenta nuevamente. Intentos restantes: " + intentosIngreso);
                }
            }
        }
    } else {
        alert("El correo ingresado no está registrado en nuestro sistema. Por favor, vuelva a intentarlo.");
    }
}
// realizar movimientos
function bancoMovimientos(banco, correo) {
    let movimiento;
    do {
        movimiento = prompt("Ingrese tipo de movimiento: D para depósito, R para retiro, C para consultar saldo, F para filtrar movienetos o S para salir");
        switch (movimiento.toUpperCase()) {
            case "D": // realizar deposito
                const montoDeposito = parseInt(prompt("Ingrese el monto a depositar:"));
                if (!isNaN(montoDeposito)) {
                    const resultadoDeposito = banco.obtenerCuenta(correo).realizarDeposito(montoDeposito);
                    alert(resultadoDeposito);
                } else {
                    alert("El monto ingresado no es válido.");
                }
                break;
            case "R": // realizar retiro
                const montoRetiro = parseInt(prompt("Ingrese el monto a retirar:"));
                if (!isNaN(montoRetiro)) {
                    const resultadoRetiro = banco.obtenerCuenta(correo).realizarRetiro(montoRetiro);
                    alert(resultadoRetiro);
                } else {
                    alert("El monto ingresado no es válido.");
                }
                break;
            case "C": // consultar saldo 
                const saldoActual = banco.obtenerCuenta(correo).consultarSaldo();
                alert(saldoActual);
                break;
            case "F": // consultar movimientos
                const tipoMovimiento = prompt("Ingrese el tipo de movimiento a filtrar (Depositvo o Retiro: ");
                const criterio = movimiento => movimiento.tipo.toLowerCase() === tipoMovimiento.toLowerCase();
                const movimientosFiltrados = banco.obtenerCuenta(correo).filtrarMovimiento(criterio);
                alert("Movimientos Filtrados: " + JSON.stringify(movimientosFiltrados, null, 2)); 
                break;
            case "B"://beneficios por dia de la semana. 
                //
            case "S": // salir del banco
                salir();
                break;
            default: // repetir opciones
                alert("Opción no válida. Intente nuevamente.");
                break;
        }
    } while (movimiento.toUpperCase() !== "S");
    function salir() {
        alert("Gracias por usar el Banco. Su sesión será cerrada.");
    }
}
// Crear una instancia del banco y agregar
const banco = new Banco();
const personas = [
    new Persona("Juan", "Pérez", "juan@example.com", "1990-01-01", "123456789", "contrasena"),
    new Persona("Maria", "Lopez", "maria@example.com", "1985-05-15", "987654321", "contrasena1"),
    new Persona("Pedro", "Martinez", "pedro@example.com", "1992-02-20", "123123123", "contrasena2"),
    new Persona("Ana", "Gomez", "ana@example.com", "1988-08-08", "456456456", "contrasena3"),
    new Persona("Luis", "Fernandez", "luis@example.com", "1995-12-12", "789789789", "contrasena4")
];
personas.forEach(persona => banco.agregarCuenta(persona, 150000));
// Iniciar el sistema bancario
iniciarSistemaBancario();