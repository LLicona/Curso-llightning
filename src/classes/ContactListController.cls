public class ContactListController {

    /**
     * Obtener una lista de contactos asociados a una cuenta
     * @return Lista de contactos obtenidos
     */
    @AuraEnabled
    public static Contact[] getContacts() {
        return [SELECT Id, FirstName, LastName, Title, Name, Phone, Email FROM Contact];
    }

    /**
     * Guardar un nuevo contacto
     * @param  con Contacto a guardar
     * @return     Id del contacto guardado
     */
    @AuraEnabled
    public static String saveContact(Contact con) {
        String contactId = null;

        try {
            insert con;
            contactId = con.Id;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }

        return contactId;
    }

    /**
     * Eliminar un contacto
     * @param  contactId Id del contacto a eliminar
     * @return           Id del contacto eliminado
     */
    @AuraEnabled
    public static String deleteContact(String contactId) {
        String deletedId = null;

        try {
            Contact con = [SELECT Id FROM Contact WHERE Id = :contactId];
            delete con;
            deletedId = con.Id;
        } catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }

        return deletedId;
    }
}