({
    // Eliminar contacto
	doDeleteContact : function(component, event, helper) {
        if (!confirm('¿Desea eliminar el contacto?')) {
            return;
        }

		var action = component.get('c.deleteContact');
        var con = component.get('v.con');

        action.setParams({
            'contactId': con.Id
        });

        // Establecer callback
        action.setCallback(this, function(result) {
            var state = result.getState();

            if (state === 'SUCCESS') {
                // Emitir evento de contacto eliminado
                var deletedEvent = component.getEvent('contactDeleted');
                deletedEvent.setParams({
                    'deletedContactId': result.getReturnValue()
                });
                deletedEvent.fire();
            } else if (state === 'ERROR') {
                alert(result.getError()[0].message);
            }
        });

        // Ejecutar la acción
        $A.enqueueAction(action);
	}
})