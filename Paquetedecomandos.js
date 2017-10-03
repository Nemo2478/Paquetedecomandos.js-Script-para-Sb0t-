var userCount = 0; // Holds the current user count
var maxUsers = 80;  // Set this to the maximum users you want
var version = "Paquete de comandos 0.10";
var server =
{
    warned: {}
};
var idioma = "Espanol";
list = new List();

function onLoad() {
	print("Bienvenido al script " + version + "!");
	print("Para ver los comandos pon /Mostrarcomandos");
	print("Para la ejecutacion correcta de los comandos por favor escribelos tal cual como se te muestra.");
	
	Users.local(function(userobj) {
  		userCount++;
	});
	
	Users.local(function(userobj) {
		if(userobj.owner == true) {
			print(userobj, "Gracias por usar este script! Recuerda revisar de vez en cuando si salio una version mas nueva en: https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
		}
	});
}

function onHelp(userobj) {
	if(userobj.level >= 1) {
		if(idioma == "Espanol") {
			print(userobj, "/Fijarlimiteusuarios <cantidad> [Pertenece al script " + version + "!]");
			print(userobj, "/Warn <id>-<razon> (Advertir a un usuario (A las tres advertencias un Kick!)) [Pertenece al script " + version + "!]");
			print(userobj, "/Idioma <Espanol | Ingles> (Cambiar el idioma del script) [Pertenece al script " + version + "!]");
			print(userobj, "/asay <color> <anuncio> (Aparece en el chat y se destaca porque esta en negrita y en algún color) [Pertenece al script " + version + "!]");
			print(userobj, "/colores (Muestra los colores disponibles) [Pertenece al script " + version + "!]");
			print(userobj, "/reports (Muestra las quejas de los usuarios) [Pertenece al script " + version + "!]");
			print(userobj, "/clearreports (Borra todos los reportes) [Pertenece al script " + version + "!]");
		}
		if(idioma == "Ingles") {
			print(userobj, "/Fijarlimiteusuarios <amount> (Set the amount of users that can join to the room) [It pertain to the script " + version + "!]");
			print(userobj, "/Warn <id>-<reason> (Warn a user (Three warnings and the user will be kicked!)) [It pertain to the script " + version + "!]");
			print(userobj, "/Idioma <Espanol | Ingles> (Change the lenguage of the script) [It pertain to the script " + version + "!]");
			print(userobj, "/asay <colour> <advertisement> (It appears in the chat and it stand out because it is in black and in some colour) [It pertain to the script " + version + "!]");
			print(userobj, "/colores (Show the avaible colours) [It pertain to the script " + version + "!]");
			print(userobj, "/reports (Show the complaints of the users) [It pertain to the script " + version + "!]");
			print(userobj, "/clearreports (Clear all the reports) [It pertain to the script " + version + "!]");
		}
	}
	if(idioma == "Espanol") {
		print(userobj, "/Version [Pertenece al script " + version + "!]");
		print(userobj, "/report <reporte> (Reporta una queja) [Pertenece al script " + version + "!]");
	}
	if(idioma == "Ingles") {
		print(userobj, "/Version [It pertain to the script " + version + "!]");
		print(userobj, "/report <report> (Report a complaint) [It pertain to the script " + version + "!]");
	}
}

function onCommand(userobj, command, target, args) {
	if(command.substr(0, 20) == "Fijarlimiteusuarios ") {
		if(userobj.level >= 1) {
			maxUsers = parseInt(command.substr(20));	
			print(userobj, "La maxima cantidad de usuarios en esta sala ha sido fijada a " + command.substr(20));
		}
	}
	if(command.substr(0, 5) == "Warn ") {
		if(userobj.level >= 1) {
			var ejemplo = command.substr(5);
			str = ejemplo.split(" ");
			var id = parseInt(str[0]);
			var n = ejemplo.indexOf(" ", 1) + 1
			if (server.warned[user(id).name] == 1) {
				server.warned[user(id).name] = 2;
			}
			else if (server.warned[user(id).name] == 2) {
				server.warned[user(id).name] = 3;
			}
			else if (server.warned[user(id).name] == 3) {
				server.warned[user(id).name] = 1;
			}
			else {
				server.warned[user(id).name] = 1;
			}
			if(idioma == "Espanol") {
				print(user(id), "Fuiste advertido! (" + server.warned[user(id).name].toString() + "/3) Razon: " + ejemplo.substr(n));
			}
			if(idioma == "Ingles") {
				print(user(id), "You was warned! (" + server.warned[user(id).name].toString() + "/3) Reason: " + str[1]);
			}
			if (server.warned[user(id).name] == 3) {
				if(idioma == "Espanol") {
					print(user(id), "Ahora seras kickeado por no haberle hecho caso a las advertencias!");
				}
				if(idioma == "Ingles") {
					print(user(id), "Now you will be kicked because you didn't pay attention to the warnings!");
				}
				user(id).disconnect();
			}
		}
	}
	if(command == "Version") {
		print(userobj, version);
	}
	if(command.substr(0, 7) == "Idioma ") {
		if(command.substr(7) == "Espanol") {
			idioma = "Espanol";
		}
		if(command.substr(7) == "Ingles") {
			idioma = "Ingles";
		}
	}
	if(command.substr(0, 5) == "asay ") {
		if(userobj.level >= 1) {
			var ejemplo1 = command.substr(5);
			str1 = ejemplo1.split(" ");
			var n1 = ejemplo1.indexOf(" ", 1) + 1;
			if(str1[0] == "Negro") {
				print("\x0301\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Verde") {
				print("\x0303\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Naranja") {
				print("\x0307\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Gris") {
				print("\x0315\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Rojo") {
				print("\x0304\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Verdeclaro") {
				print("\x0309\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Amarillo") {
				print("\x0308\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Azul") {
				print("\x0312\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Rosado") {
				print("\x0313\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Blanco") {
				print("\x0300\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Black") {
				print("\x0301\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Green") {
				print("\x0303\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Orange") {
				print("\x0307\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Grey") {
				print("\x0315\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Red") {
				print("\x0304\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Peagreen") {
				print("\x0309\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Yellow") {
				print("\x0308\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Blue") {
				print("\x0312\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "Pink") {
				print("\x0313\x0501" + ejemplo1.substr(n1));
			}
			if(str1[0] == "White") {
				print("\x0300\x0501" + ejemplo1.substr(n1));
			}
		}
	}
	if(command == "colores") {
		if(idioma == "Espanol") {
			if(userobj.level >= 1) {
				print(userobj, "Negro");
				print(userobj, "Verde");
				print(userobj, "Naranja");
				print(userobj, "Gris");
				print(userobj, "Rojo");
				print(userobj, "Verdeclaro");
				print(userobj, "Amarillo");
				print(userobj, "Azul");
				print(userobj, "Rosado");
				print(userobj, "Blanco");
			}
		}
		if(idioma == "Ingles") {
			if(userobj.level >= 1) {
				print(userobj, "Black");
				print(userobj, "Green");
				print(userobj, "Orange");
				print(userobj, "Gray");
				print(userobj, "Red");
				print(userobj, "Peagreen");
				print(userobj, "Yellow");
				print(userobj, "Blue");
				print(userobj, "Pink");
				print(userobj, "White");
			}
		}
	}
	if(command.substr(0, 7) == "report ") {
		if(idioma == "Espanol") {
			list.insert(0, userobj.name + " (Id: " + userobj.id + ") hizo el siguiente reporte: " + command.substr(7));
			Users.local(function(userobj) {
  				if(userobj.level > 0) {
					print(userobj, "Han llegado nuevos reportes!");
				}
			});
		}
		if(idioma == "Ingles") {
			list.insert(0, userobj.name + " (Id: " + userobj.id + ") made the following report: " + command.substr(7));
			Users.local(function(userobj) {
  				if(userobj.level > 0) {
					print(userobj, "New reports cames!");
				}
			});
		}
	}
	if(command == "reports") {
		if(userobj.level >= 1) {
			if(list.count == 0) {
				if(idioma == "Espanol") {
					print(userobj, "No hay ningun reporte!");
				}
				if(idioma == "Ingles") {
					print(userobj, "There are no reports!");
				}
			}
			else {
				for (var i = 0; i < list.length; i++) {
					print(userobj, list[i]);
				}
			}
		}
	}
	if(command == "clearreports") {
		if(userobj.level >= 1) {
			if(list.count == 0) {
				if(idioma == "Espanol") {
					print(userobj, "No hay ningun reporte!");
				}
				if(idioma == "Ingles") {
					print(userobj, "There are no reports!");
				}
			}
			else {
				list.clear();
			}
		}
	}
}

function onJoinCheck(userobj) {
	if(userCount + 1 > maxUsers) {	
		if(idioma == "Espanol") {
			print(userobj, "Lo siento " + userobj.name + " pero esta sala ha llegado al limite de la cantidad de usuarios permitida.");
		}
		if(idioma == "Ingles") {
			print(userobj, "Sorry " + userobj.name + " but this room came to the limit of the count of users allowed.");
		}
		return false;
	}
	userCount++;
	if(idioma == "Espanol") {
		print(userobj, "Esta sala usa el script " + version);
		print(userobj, "https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
	}
	if(idioma == "Ingles") {
		print(userobj, "This room use the script " + version);
		print(userobj, "https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
	}
	return true;
}

function onPart(userobj) {
	userCount = userCount - 1;
}
