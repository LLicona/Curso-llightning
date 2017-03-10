({
    // Obtener una lista de contactos
	doGetContacts : function(component, event, helper) {
		var action = component.get('c.getContacts');
        
        action.setCallback(this, function(result) {
            var state = result.getState();
            
            if (state === 'SUCCESS') {
                var contactList = result.getReturnValue();
                component.set('v.contactList', contactList);        
            } else if (state === 'ERROR') {
                var errorMessage = result.getError()[0].message;
                alert(errorMessage);
            }
        });
        
        // Ejecutar acción
        $A.enqueueAction(action);
	},
    
    // Eliminar un contacto de la lista
    removeFromList : function(component, event, helper) {
        var deletedContactId = event.getParam('deletedContactId');
        var contactList = component.get('v.contactList');
        for (var i = 0; i < contactList.length; i++) {
            if (contactList[i].Id == deletedContactId) {
                contactList.splice(i, 1);
                break;
            }
        }
        component.set('v.contactList', contactList);
    },
    
    // Guardar un nuevo contacto
    doSaveContact : function(component, event, helper) {
        var action = component.get('c.saveContact');
        var newContact = component.get('v.newContact');
        
        // Parámetros
        action.setParams({
            'con': newContact
        });
        
        // Callback
        action.setCallback(this, function(result){
            var state = result.getState();
            if (state === 'SUCCESS') {
                var contactId = result.getReturnValue();
                alert('Registro guardado: ' + contactId);
                
                // Agregar a la lista
                newContact.Id = contactId;
                var contactList = component.get('v.contactList');
                contactList.push(newContact);
                component.set('v.contactList', contactList);
                
                // Limpiar formulario y ocultar diálogo
                component.set('v.newContact', {
                    'sobjectType': 'Contact',
                    'FirstName': '',
                    'LastName': '',
                    'Phone': ''
                });
                helper.hideModal(component);
            } else if (state === 'ERROR') {
                alert(result.getError()[0].message);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    // Mostrar formulario
    showForm : function(component, event, helper) {
        helper.showModal(component);
    },
    
    // Ocultar formulario
    hideForm : function(component, event, helper) {
        helper.hideModal(component);
    }
})