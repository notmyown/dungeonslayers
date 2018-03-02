function DataHandler(_ds) {
	this.data = {
		characters : [],

		load : function data_load(input) {
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
			_ds.html.init();
			_ds.stats.init();
			$(".ds .menu>SPAN").text(_ds.character.name + " (" + _ds.character.stufe + ") " + _ds.character.volk + " - " + _ds.character.klasse);
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
			var inputElement = document.createElement("input");
			// Set its type to file
			inputElement.type = "file";
			// Set accept to the file types you want the user to select.
			// Include both the file extension and the mime type
			inputElement.accept = "json";

			// set onchange event to call callback when user has selected file
			inputElement.addEventListener("change", function(evt) {
				var files = evt.target.files; // FileList object

				// Loop through the FileList and render image files as
				// thumbnails.
				for (var i = 0, f; f = files[i]; i++) {

					var reader = new FileReader();

					// Closure to capture the file information.
					reader.onload = (function(theFile) {
						return function(e) {
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