import { User } from './user';
import { Etat } from './etat';

export class Tache {
    idTache: number;
    libelleTache: string;
    dureeTache: number;
    dateTache: Date;
    commentaireTache: String;
    userTache: User;
    etatTache: Etat;
}