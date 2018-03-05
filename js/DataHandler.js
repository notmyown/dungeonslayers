function DataHandler(_ds) {
	this.data = {
		characters : [],
		log : function(input, label) {
			if (label) {
				$("#settings .log").append("<span style='color: red;'>" + label + "</span>");
			}
			$("#settings .log").append(""+ input).append("<br/>");
		},
		load : function data_load(input) {
			_ds.data.log(input, "Load Input: ");
			var isMobile = false; // initiate as false
			// device detection
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
			    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
				isMobile = true;
				$("#stylesheet").attr("href", "css/ds_mobile.css");
			}
			var obj = input;
			if (!obj) {
				obj = localStorage.getItem("nmo.dungeonslayers.characters")
			}
			var data;
			if (obj && obj.characters) {
				data = obj;
			} else if (obj) {
				data = JSON.parse(obj);
				if (data && data.characters && data.characters[0]) {
					_ds.data.characters = [];
					$(data.characters).each(function(index, value) {
						_ds.data.characters.push(value);
					});
				} else {
					_ds.data.characters.push(new Character());
				}
			} else if (!obj) {
				_ds.data.characters = [];
				_ds.data.characters.push(new Character());
			}

			var idx = _ds.data.index;
			if (!idx) {
				idx = 0;
			}
			_ds.character = _ds.data.characters[idx];
			_ds.data.index = idx;
			_ds.data.log(_ds.character, "Loaded:");
			_ds.html.init();
			_ds.stats.init();
			$(".ds #menuToggle .m_charname").text(_ds.character.name + " (" + _ds.character.stufe + ") " + _ds.character.volk + " - " + _ds.character.klasse);
		},
		save : function data_save() {
			_ds.data.collect();
			_ds.data.characters[_ds.data.index] = _ds.character;
			var text = JSON.stringify(_ds.data, null, 2);
			text = text.replace(/[\u007F-\uFFFF]/g, function(chr) {
				return "\\u"
						+ ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
			})
			localStorage.setItem("nmo.dungeonslayers.characters", text);
		},
		import : function() {
			if (typeof window.FileReader !== 'function') {
			      alert("The file API isn't supported on this browser yet.");
			      return;
			}
			var inputElement = document.createElement("input");
			// Set its type to file
			inputElement.type = "file";
			// Set accept to the file types you want the user to select.
			// Include both the file extension and the mime type
			inputElement.accept = "json";

			// set onchange event to call callback when user has selected file
			inputElement.addEventListener("change", function(evt) {
				var files = evt.target.files; // FileList object
				_ds.data.log(files, "Files: ");
				if (!files || !files[0]) {
					alert("No files uploaded");
				}
				// Loop through the FileList and render image files as
				// thumbnails.
				for (var i = 0, f; f = files[i]; i++) {
					_ds.data.log(f,"File: ");
					var reader = new FileReader();

					// Closure to capture the file information.
					reader.onload = (function(theFile) {
						return function(e) {
							_ds.data.log(theFile,"File OnLoad: ");
							_ds.data.load(e.target.result);
						};
					})(f);

					// Read in the image file as a data URL.
					reader.readAsText(f);
				}
			});

			// dispatch a click event to open the file dialog
			inputElement.dispatchEvent(new MouseEvent("click"));
		},
		export : function() {
			_ds.data.collect();
			var text = JSON.stringify({
				"characters" : _ds.data.characters,
				"index" : _ds.data.index
			}, null, 2);
			text = text.replace(/[\u007F-\uFFFF]/g, function(chr) {
				return "\\u"
						+ ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
			})
			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:text/plain;charset=utf-8,'
					+ encodeURIComponent(text));
			pom.setAttribute('download', "dungeonslayers.json");

			if (document.createEvent) {
				var event = document.createEvent('MouseEvents');
				event.initEvent('click', true, true);
				pom.dispatchEvent(event);
			} else {
				pom.click();
			}
		},
		clear : function data_clear() {
			_ds.data.collect();
			var data = {
				characters : []
			};
			// data.characters.push(_ds.character);
			localStorage.removeItem("nmo.dungeonslayers.characters");
		},
		collect : function data_collect() {
			_ds.character.player = _ds.input("player").text();
			_ds.character.name = _ds.input("name").text();
			_ds.character.volk = _ds.input("volk").text();
			_ds.character.stufe = _ds.input("stufe").num();
			_ds.character.lp = _ds.input("lp").num();
			_ds.character.tp = _ds.input("tp").num();
			_ds.character.klasse = _ds.input("klasse").text();
			_ds.character.volksfahigkeiten = _ds.input("volksfahigkeiten")
					.text();
			_ds.character.exp = _ds.input("exp").num();
			_ds.character.heldenklasse = _ds.input("heldenklasse").text();
			_ds.character.gold = _ds.gold.value;

			_ds.character.geschlecht = $('#ds_i_steckbrief_geschlecht').val();
			_ds.character.geburtsort = $('#ds_i_steckbrief_geburtsort').val();
			_ds.character.geburtstag = $('#ds_i_steckbrief_geburtstag').val();
			_ds.character.alter = $('#ds_i_steckbrief_alter').val();
			_ds.character.grosse = $('#ds_i_steckbrief_grosse').val();
			_ds.character.gewicht = $('#ds_i_steckbrief_gewicht').val();
			_ds.character.haarfarbe = $('#ds_i_steckbrief_haarfarbe').val();
			_ds.character.augenfarbe = $('#ds_i_steckbrief_augenfarbe').val();
			_ds.character.besonderes = $('#ds_i_steckbrief_besonderes').val();
			_ds.character.sprachen = $('#ds_i_steckbrief_sprachen').val();
			_ds.character.schriftzeichen = $('#ds_i_steckbrief_schriftzeichen')
					.val();

			_ds.character.weapons = [];
			var list = $('#waffen TBODY TR');
			list
					.each(function(index, elem) {
						var data = {
							name : $(elem).find(".name").val(),
							nah : $(elem).find(".nah").attr("checked") == "checked",
							fern : $(elem).find(".fern").attr("checked") == "checked",
							attributes : $(elem).find(".Eigenschaften").val(),
							active : $(elem).find(".active").attr("checked") == "checked",
						}
						_ds.character.weapons.push(data);
					});
			_ds.character.defense = [];
			list = $('#defense TBODY TR');
			list
					.each(function(index, elem) {
						var data = {
							name : $(elem).find(".name").val(),
							nah : $(elem).find(".nah").attr("checked") == "checked",
							fern : $(elem).find(".fern").attr("checked") == "checked",
							attributes : $(elem).find(".Eigenschaften").val(),
							active : $(elem).find(".active").attr("checked") == "checked",
						}
						_ds.character.defense.push(data);
					});
			_ds.character.spells = [];
			list = $('#spells TBODY TR');
			list
					.each(function(index, elem) {
						var data = {
							name : $(elem).find(".name").val(),
							nah : $(elem).find(".nah").attr("checked") == "checked",
							fern : $(elem).find(".fern").attr("checked") == "checked",
							attributes : $(elem).find(".Eigenschaften").val(),
							active : $(elem).find(".active").attr("checked") == "checked",
						}
						_ds.character.spells.push(data);
					});
			_ds.character.talents = [];
			list = $('#talents TBODY TR');
			list
					.each(function(index, elem) {
						var data = {
							name : $(elem).find(".name").val(),
							nah : $(elem).find(".nah").attr("checked") == "checked",
							fern : $(elem).find(".fern").attr("checked") == "checked",
							attributes : $(elem).find(".Eigenschaften").val(),
							active : $(elem).find(".active").attr("checked") == "checked",
							rang : $(elem).find(".stufe").val()
						}
						_ds.character.talents.push(data);
					});
			_ds.character.inventar = [];
			list = $('#inventar TBODY TR');
			list.each(function(index, elem) {
				var data = {
					name : $(elem).find(".name").val(),
					attributes : $(elem).find(".Eigenschaften").val(),
					wo : $(elem).find(".Wo").val()
				}
				_ds.character.inventar.push(data);
			});
			_ds.character.begleiter = [];
			list = $('#begleiter TBODY TR');
			list.each(function(index, elem) {
				var data = {
					name : $(elem).find(".name").val(),
					art : $(elem).find(".art").val(),
					kor : $(elem).find(".kor").val(),
					agi : $(elem).find(".agi").val(),
					gei : $(elem).find(".gei").val(),
					st : $(elem).find(".st").val(),
					ha : $(elem).find(".ha").val(),
					be : $(elem).find(".be").val(),
					ge : $(elem).find(".ge").val(),
					ve : $(elem).find(".ve").val(),
					au : $(elem).find(".au").val(),
					lebenskraft : $(elem).find(".lebenskraft").val(),
					abwehr : $(elem).find(".abwehr").val(),
					initiative : $(elem).find(".initiative").val(),
					laufen : $(elem).find(".laufen").val(),
					schlagen : $(elem).find(".schlagen").val(),
					schiessen : $(elem).find(".schiessen").val(),
					zaubern : $(elem).find(".zaubern").val(),
					zielzauber : $(elem).find(".zielzauber").val(),
				}
				_ds.character.begleiter.push(data);
			});
			_ds.character.diary = [];
			list = $('#diary TBODY TR');
			list.each(function(index, elem) {
				var data = {
					name : $(elem).find("INPUT").val(),
					text : $(elem).find("TEXTAREA").val(),
				}
				_ds.character.diary.push(data);
			});
			_ds.data.characters[_ds.data.index] = _ds.character;
		},
		defaults : function(character) {

			_ds.input('koerper').set(character.kor);
			_ds.input('agilitaet').set(character.agi);
			_ds.input('geist').set(character.gei);
			_ds.input('staerke').set(character.st);
			_ds.input('haerte').set(character.ha);
			_ds.input('bewegung').set(character.be);
			_ds.input('geschick').set(character.ge);
			_ds.input('verstand').set(character.ve);
			_ds.input('aura').set(character.au);
			_ds.input('name').set(character.name);
			_ds.input('stufe').set(character.stufe);
			_ds.input('lp').set(character.lp);
			_ds.input('exp').set(character.exp);
			_ds.input('tp').set(character.tp);
			_ds.input('player').set(character.player);
			_ds.input('volk').set(character.volk);
			$("#ds_i_volk SELECT").val(character.volk);
			_ds.input('klasse').set(character.klasse);
			_ds.input('heldenklasse').set(character.heldenklasse);
			_ds.input('volksfahigkeiten').set(character.volksfahigkeiten);
			_ds.input('panzerung').set(0);

			$('#ds_i_steckbrief_geschlecht').val(_ds.character.geschlecht);
			$('#ds_i_steckbrief_geburtsort').val(_ds.character.geburtsort);
			$('#ds_i_steckbrief_geburtstag').val(_ds.character.geburtstag);
			$('#ds_i_steckbrief_alter').val(_ds.character.alter);
			$('#ds_i_steckbrief_grosse').val(_ds.character.grosse);
			$('#ds_i_steckbrief_gewicht').val(_ds.character.gewicht);
			$('#ds_i_steckbrief_haarfarbe').val(_ds.character.haarfarbe);
			$('#ds_i_steckbrief_augenfarbe').val(_ds.character.augenfarbe);
			$('#ds_i_steckbrief_besonderes').val(_ds.character.besonderes);
			$('#ds_i_steckbrief_sprachen').val(_ds.character.sprachen);
			$('#ds_i_steckbrief_schriftzeichen').val(
					_ds.character.schriftzeichen);

			$('TR.inputtofind').each(function() {
				$(this).find(".outline").html("0");
			});
			// this.gold.calc.init();
			// _ds.character.gold = _ds.gold.value;
			_ds.gold.value = character.gold;
			_ds.gold.calc.val(0);
		}
	}
}