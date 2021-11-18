import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';

//importamos los paquetes que instalamos en la consola
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository

  ) { }

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
  // metodo para identificar la autoricacion de la app
  //inicializar en el constructor el objeto
  IdentificarPersona(usuario: string, clave: string) {
    try {
      let p = this.personaRepository.findOne({
        where: {
          correo: usuario, clave: clave
        }
      })
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  // metodo para token
  GenerarTokenJWT(persona: Persona) {
    let token = jwt.sign({
      data: {
        id: persona.id,
        correo: persona.id,
        nombre: persona.nombres + " " + persona.apellidos
      }
    }, Llaves.claveJWT);
    return token;
  }

  ValidacionTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
