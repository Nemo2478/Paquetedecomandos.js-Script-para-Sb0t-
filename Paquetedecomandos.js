var userCount = 0; // Holds the current user count
var maxUsers = 80;  // Set this to the maximum users you want
var versionNumber = 0.16
var version = "Paquete de comandos 0.16";
var server =
{
    warned: {}
};
var server1 =
{
    hightlight: {}
};
var server2 =
{
    colour: {}
};

var idioma = "Espanol";
list = new List();
var answer = false;

var timer = new Timer();
timer.interval = 1800000;


function onLoad() {
	print("Bienvenido al script " + version + "!");
	print("Los comandos los encuentras en #help o /help.");
	print("Para la ejecutacion correcta de los comandos por favor escribelos tal cual como se te muestra.");
	Users.local(function(userobj) {
  		userCount++;
	});
	
	Users.local(function(userobj) {
		if(userobj.muzzled == true) {
			if (File.exists("Muzzled.txt")) {
                        	var muted = File.load("Muzzled.txt");
				if(muted.length > 0) {
					var lines = muted.split("\r\n");
					var registered = true;
					for(f=0; f<lines.length; f++) {
						if(lines[f] == userobj.name) {
							registered = false;
							f = lines.length + 1;
						}
					}
					if(registered == true) {
						File.append("Muzzled.txt",userobj.name + "\r\n");
					}
				}
				else {
					File.append("Muzzled.txt",userobj.name + "\r\n");
				}
			}
                        else {
				File.append("Muzzled.txt",userobj.name + "\r\n");
			}
		}
	});
	
	timer.oncomplete = function ()
	{
    		var http = new HttpRequest();
		http.src = "https://drive.google.com/uc?export=download&id=1bjh8ui8cbpGQUUa1o8QqUYalI-57ii5w";

		http.oncomplete = function (e)
		{
    			if (e)
    			{
        			var lines = parseFloat(this.page)

        			if(lines>versionNumber)
				{
					Users.local(function(userobj) {
  						if(userobj.owner == true)
						{
							if(idioma == "Espanol") {
								sendPM(userobj, Room.botName, "Una nueva version del script Paquetedecomandos.js ha sido publicada. Por favor descargala de: https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
							}
							if(idioma == "Ingles") {
								sendPM(userobj, Room.botName, "A new script version of Paquetedecomandos.js was released. Please download it from: https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
							}	
						}
					});
				}
    			}
		}

		http.download();

    		timer.start();
	}

	timer.start();
}

function onHelp(userobj) {
	if(idioma == "Espanol") {
		print(userobj, "");
		print(userobj, "\x07Paquetedecomandos.js");
		print(userobj, "/Version");
		print(userobj, "/report <reporte> (Reporta una queja)");
	}
	if(idioma == "Ingles") {
		print(userobj, "");
		print(userobj, "\x07Paquetedecomandos.js");
		print(userobj, "/Version");
		print(userobj, "/report <report> (Report a complaint)");
	}
	if(userobj.level >= 1) {
		if(idioma == "Espanol") {
			print(userobj, "/Fijarlimiteusuarios <cantidad> (Fijar la cantidad de usuarios que pueden entrar en la sala)");
			print(userobj, "/Warn <id> <razon> (Advertir a un usuario (A las tres advertencias el advertido sera kickeado!))");
			print(userobj, "/Idioma <Espanol | Ingles> (Cambiar el idioma del script)");
			print(userobj, "/asay <color> <anuncio> (Aparece en el chat y se destaca porque esta en negrita y en algún color)");
			print(userobj, "/colores (Muestra los colores disponibles)");
			print(userobj, "/reports (Muestra las quejas de los usuarios)");
			print(userobj, "/clearreports (Borra todos los reportes)");
			print(userobj, "/setcolour <Id> <Color> (Le cambia a alguien el color del nick)");
			print(userobj, "/hightlight <Id> (Cambia el color del nick de un usuario de verde a rojo y al reves)");
			print(userobj, "/muted (Muestra todos los nombres de usuarios muteados)");
			print(userobj, "/laston (Muestra tu ultima entrada)");
		}
		if(idioma == "Ingles") {
			print(userobj, "/Fijarlimiteusuarios <amount> (Set the amount of users that can join to the room)");
			print(userobj, "/Warn <id>-<reason> (Warn a user (Three warnings and the user will be kicked!))");
			print(userobj, "/Idioma <Espanol | Ingles> (Change the lenguage of the script)");
			print(userobj, "/asay <colour> <advertisement> (It appears in the chat and it stand out because it is in black and in some colour)");
			print(userobj, "/colores (Show the avaible colours)");
			print(userobj, "/reports (Show the complaints of the users)");
			print(userobj, "/clearreports (Clear all the reports)");
			print(userobj, "setcolour <Id> <Colour> (It changes somebody the colour of the nick)");
			print(userobj, "/hightlight <Id> (Change the color of the nick of an user from green to red and backward)");
			print(userobj, "/muted (Show all the names of muted users)");
			print(userobj, "/laston (Show your last entry)");
		}
	}
}

function onCommand(userobj, command, target, args) {
	if(command.substr(0, 20) == "Fijarlimiteusuarios ") {
		if(userobj.level >= 1) {
			maxUsers = parseInt(command.substr(20));	
			if(idioma == "Espanol") {
				print(userobj, "La maxima cantidad de usuarios en esta sala ha sido fijada a " + command.substr(20));
			}
			if(idioma == "Ingles") {
				print(userobj, "The maximum count of users of this room was set to " + command.substr(20));
			}
		}
	}
	if(command.substr(0, 5) == "Warn ") {
		if(userobj.level >= 1) {
			var ejemplo = command.substr(5);
			str = ejemplo.split(" ");
			var id = parseInt(str[0]);
			var n = ejemplo.indexOf(" ", 1) + 1;
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
	if(command.substr(0, 10) == "setcolour ") {
		if(userobj.level >= 1) {
			var ejemplo2 = command.substr(10);
			str2 = ejemplo2.split(" ");
			var id2 = parseInt(str2[0]);
			var n2 = str2[1];
			if(n2 == "Negro") {
				user(id2).customName = "\x0301" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Verde") {
				user(id2).customName = "\x0303" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Naranja") {
				user(id2).customName = "\x0307" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Gris") {
				user(id2).customName = "\x0315" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Rojo") {
				user(id2).customName = "\x0304" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Verdeclaro") {
				user(id2).customName = "\x0309" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Amarillo") {
				user(id2).customName = "\x0308" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Azul") {
				user(id2).customName = "\x0312" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Rosado") {
				user(id2).customName = "\x0313" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Blanco") {
				user(id2).customName = "\x0300" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Black") {
				user(id2).customName = "\x0301" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Green") {
				user(id2).customName = "\x0303" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Orange") {
				user(id2).customName = "\x0307" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Grey") {
				user(id2).customName = "\x0315" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Red") {
				user(id2).customName = "\x0304" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Peagreen") {
				user(id2).customName = "\x0309" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Yellow") {
				user(id2).customName = "\x0308" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Blue") {
				user(id2).customName = "\x0312" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "Pink") {
				user(id2).customName = "\x0313" + user(id2).name + "> " + "\x0312";
			}
			if(n2 == "White") {
				user(id2).customName = "\x0300" + user(id2).name + "> " + "\x0312";
			}
		}
	}
	if(command.substr(0, 11) == "hightlight ") {
		if(userobj.level >= 1) {
			var id3 = parseInt(command.substr(11));
			server1.hightlight[user(id3).name] = "On";
			server2.colour[user(id3).name] = "Green";
		}
	}
	if(command.substr(0, 7) == "muzzle ") {
		if (userobj.level >= 1) {
			if(target.muzzled == true) {
				if (File.exists("Muzzled.txt")) {
                        		var muted = File.load("Muzzled.txt");
					if(muted.length > 0) {
						var lines = muted.split("\r\n");
						var registered = true;
						for(f=0; f<lines.length; f++) {
							if(lines[f] == target.name) {
								registered = false;
								f = lines.length + 1;
							}
						}
						if(registered == true) {
							File.append("Muzzled.txt",target.name + "\r\n");
						}
					}
					else {
						File.append("Muzzled.txt",target.name + "\r\n");
					}
				}
                        	else {
					File.append("Muzzled.txt",target.name + "\r\n");
				}
			}
		}
	}
	if(command.substr(0, 9) == "unmuzzle ") {
		if(target.muzzled == false) {
			if (File.exists("Muzzled.txt")) {
				var str = File.load("Muzzled.txt");
				var lines = str.split("\r\n");
				for(f=0; f<lines.length; f++) {
					if(lines[f] == target.name) {
						lines.splice(f,1);
					}
				}
				var newtext = lines.join("\r\n");
				File.save("Muzzled.txt", newtext);
			}
		}
	}
	if(command == "muted") {
		if(userobj.level >= 1) {
			if (File.exists("Muzzled.txt")) {
				var muted = File.load("Muzzled.txt");
				if(muted.length > 0) {
					var lines = muted.split("\r\n");
					for(f=0; f<lines.length; f++) {
						if(f != lines.length - 1) {
							print(userobj, lines[f]);
						}
					}
				}
				else {
					if(idioma == "Espanol") {
					print(userobj, "No se encontro ningun usuario muteado!");
					}
					if(idioma == "Ingles") {
						print(userobj, "None muted user was found!");
					}
				}
			}
			else {
				if(idioma == "Espanol") {
					print(userobj, "No se encontro un registro de usuarios muteados!");
				}
				if(idioma == "Ingles") {
					print(userobj, "Muted-users-register was not found!");
				}
			}
		}
	}
	if(command == "laston") {
		if(userobj.level >= 1) {
			if (File.exists("Entries.txt")) {
				var entries = File.load("Entries.txt");
				var lines = entries.split("\r\n");
				for(f=0; f<lines.length; f++) {
					if(lines[f].substr(8) == userobj.name) {
						if(idioma == "Espanol") {
							var fecha = lines[f+1].substr(9, 10);
							var hora = lines[f+1].substr(20);
							print(userobj, "Tu ultima entrada fue el " + fecha + " a las " + hora + " hs");
						}
						if(idioma == "Ingles") {
							var fecha = lines[f+1].substr(9, 10);
							var hora = lines[f+1].substr(20);
							print(userobj, "Your last entry was " + fecha + " at " + hora + " hs");
						}
					}
				}
			}
			else {
				if(idioma == "Espanol") {
					print(userobj, "Aun no se creo un registro de entradas.");
				}
				if(idioma == "Ingles") {
					print(userobj, "An entry register has not yet been created.");
				}
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
	return true;
}

function onJoin(userobj) {
	if(idioma == "Espanol") {
		print(userobj, "Esta sala usa el script " + version);
		print(userobj, "https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
	}
	if(idioma == "Ingles") {
		print(userobj, "This room use the script " + version);
		print(userobj, "https://github.com/Nemo2478/Paquetedecomandos.js-Script-para-Sb0t-/releases");
	}
	if(userobj.muzzled == true) {
			if (File.exists("Muzzled.txt")) {
                        	var muted = File.load("Muzzled.txt");
				if(muted.length > 0) {
					var lines = muted.split("\r\n");
					var registered = true;
					for(f=0; f<lines.length; f++) {
						if(lines[f] == userobj.name) {
							registered = false;
							f = lines.length + 1;
						}
					}
					if(registered == true) {
						File.append("Muzzled.txt",userobj.name + "\r\n");
					}
				}
				else {
					File.append("Muzzled.txt",userobj.name + "\r\n");
				}
			}
                        else {
				File.append("Muzzled.txt",userobj.name + "\r\n");
			}
	}
	if(userobj.level >= 1) {
		var cTime = new Date();
		var h = cTime.getHours();
		var m = cTime.getMinutes();
		var s = cTime.getSeconds();
		var d = cTime.getDate();
		var mo = cTime.getMonth() + 1;
		var j = cTime.getFullYear();
		if(d.toString().length == 1) {
			d = d.toString();
			d = "0" + d;
		}
		if(mo.toString().length == 1) {
			mo = mo.toString();
			mo = "0" + mo;
		}
		if(h.toString().length == 1) {
			h = h.toString();
			h = "0" + h;
		}
		if(s.toString().length == 1) {
			s = s.toString();
			s = "0" + s;
		}
		if(m.toString().length == 1) {
			m = m.toString();
			m = "0" + m;
		}
		var entrada = "Nombre: " + userobj.name + "\r\n" + "Entrada: " + d + "." + mo + "." + j + " " + h + ":" + m + ":" + s;
		if (File.exists("Entries.txt")) {
			var entries = File.load("Entries.txt");
			var lines = entries.split("\r\n");
			var registered = false;
			for(f=0; f<lines.length; f++) {
				if(lines[f].substr(8) == userobj.name) {
					lines[f+1] = "Entrada: " + d + "." + mo + "." + j + " " + h + ":" + m + ":" + s;
					registered = true;
				}
			}
			if(registered == false) {
				File.append("Entries.txt",entrada + "\r\n" + "\r\n");
			}
			else {
				var newentries = lines.join("\r\n");
				File.save("Entries.txt", newentries);
			}
		}
                else {
			File.append("Entries.txt",entrada + "\r\n" + "\r\n");
		}
	}
}
function onPart(userobj) {
	userCount = userCount - 1;
}

function onTextBefore(userobj, text) { 
	if(server1.hightlight[userobj.name] == "On") {
		if(server2.colour[userobj.name] == "Green") {
			userobj.customName = "\x0303" + userobj.name + "> " + "\x0312";
			server2.colour[userobj.name] = "Red";
		} else {
			userobj.customName = "\x0304" + userobj.name + "> " + "\x0312";
			server2.colour[userobj.name] = "Green";
		}
	}
	return text;
}