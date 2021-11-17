import { /* inject, */ BindingScope, injectable} from '@loopback/core';

//importamos los paquetes que instalamos en la consola
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  //metodo para generador de clave , llamamos el paquete que guardamos
  GenerarClave() {
    //primer atributo BITS para cantidad de valores
    //segundo atributo si es fuerte la clave o no dejaremos false
    let clave = generador(8, false);
    return clave;
  }

  // metodos para cifrar la clave (clave para cifrar )
  CifrarClave(clave: string) {
    // metodo encriptacion :MD5
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;

  }
}
