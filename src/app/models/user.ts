import { Role } from './role';
import { Secteur } from './secteur';

export class User {
    idUser: number;
    nomUser: String;
    prenomUser: String;
    emailUser: String;
    loginUser: String;
    pwdUser: String;
    roleUser: Role;
    secteurUser: Secteur;
}