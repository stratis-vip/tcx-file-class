import { iXmlAuthor } from "../classes/iFaces";
/**
 * Τα στοιχεία του προγράμματος που παρήγαγε το TCX αρχείο
 */
export default class Author {
    /**Το όνομα */
    name: string;
    /**Ο τύπος του προγράμματος */
    typeOfAuthor: string | any;
    /**Η έκδοση */
    build: string;
    /**Η γλώσσα */
    langId: string;
    /**Ο αριθμός ονομαστικού (αν υπάρχει) */
    partNumber: string;
    /**
     * Δημιουργεί το αντικείμενο Author από το αντίστοιχο του TCX
     * @param {iXmlAuthor} obj το αποθηκευμένο σε xml μορφή αντικείμενο στο TCX
     */
    constructor(obj: iXmlAuthor | any);
}
