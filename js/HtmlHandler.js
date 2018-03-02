function HtmlHandler(_ds) {
	this.html = {
		chars : $('#chars TBODY'),
		weapons : $('#waffen TBODY'),
		defense : $('#defense TBODY'),
		talents : $('#talents TBODY'),
		spells : $('#spells TBODY'),
		inventar : $('#inventar TBODY'),
		begleiter : $('#begleiter TBODY'),
		diary : $('#diary TBODY'),

		html : function() {
			_ds.html.chars.find("TR").remove();
			if (_ds.data.characters) {
			_ds.data.characters.forEach(function(entry, idx) {
				_ds.html.chars
				.append("<tr><td><input type='submit' class='load_char' id='char_" + idx + "' value='&Ouml;ffnen'/></td><td>"
						+ entry.name + " (" + entry.stufe + ")"
						+ " " + entry.volk + " - " + entry.klasse
						+ "</td></tr>");
			});
			}
			_ds.html.weapons.find("TR").remove();
			if (_ds.character.weapons) {
			_ds.character.weapons
					.forEach(function(entry) {
						_ds.html.weapons
								.append("<tr><td><input class='name' type=text value='"
										+ entry.name
										+ "'></td><td><label class='checkbox'><input type='checkbox' class='nah' "
										+ (entry.nah ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><label class='checkbox'><input type='checkbox' class='fern' + "
										+ (entry.fern ? "checked" : "")
										+ " /><span class='checkmark'></span></label></td><td><input class='Eigenschaften' type=text value='"
										+ entry.attributes
										+ "'></td><td><label class='checkbox'><input class='active' type='checkbox' "
										+ (entry.active ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.defense.find("TR").remove();
			if (_ds.character.defense) {
			_ds.character.defense
					.forEach(function(entry) {
						_ds.html.defense
								.append("<tr><td><input class='name' type=text value='"
										+ entry.name
										+ "'></td><td><input class='Eigenschaften' type=text value='"
										+ entry.attributes
										+ "'></td><td><label class='checkbox'><input class='active' type='checkbox' "
										+ (entry.active ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.talents.find("TR").remove();
			if (_ds.character.talents) {
			_ds.character.talents
					.forEach(function(entry) {
						_ds.html.talents
								.append("<tr><td><input class='name' type=text value='"
										+ entry.name
										+ "'></td><td><input class='Eigenschaften' type=text value='"
										+ entry.attributes
										+ "'></td><td><input class='stufe' type=text value='"
										+ entry.rang
										+ "'></td><td><label class='checkbox'><input class='active' type='checkbox' "
										+ (entry.active ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.spells.find("TR").remove();
			if (_ds.character.spells) {
			_ds.character.spells
					.forEach(function(entry) {
						_ds.html.spells
								.append("<tr><td><input class='name' type=text value='"
										+ entry.name
										+ "'></td><td><label class='checkbox'><input type='checkbox' class='nah' "
										+ (entry.nah ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><label class='checkbox'><input type='checkbox' class='fern' + "
										+ (entry.fern ? "checked" : "")
										+ " /><span class='checkmark'></span></label></td><td><input class='Eigenschaften' type=text value='"
										+ entry.attributes
										+ "'></td><td><label class='checkbox'><input class='active' type='checkbox' "
										+ (entry.active ? "checked" : "")
										+ "/><span class='checkmark'></span></label></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.inventar.find("TR").remove();
			if (_ds.character.inventar) {
			_ds.character.inventar
					.forEach(function(entry) {
						_ds.html.inventar
								.append("<tr><td><input class='name' type=text value='"
										+ entry.name
										+ "'></td><td><input class='Wo' type=text value='"
										+ entry.wo
										+ "'></td><td><input class='Eigenschaften' type=text value='"
										+ entry.attributes
										+ "'></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.begleiter.find("TR").remove();
			if (_ds.character.begleiter) {
			_ds.character.begleiter
					.forEach(function(entry) {
						_ds.html.begleiter
								.append("<tr><td><input class='name' value='"
										+ entry.name
										+ "' type='text'></td><td><input class='art' value='"
										+ entry.art
										+ "' type='text'></td><td><input class='kor' value='"
										+ entry.kor
										+ "' type='text'></td><td><input class='agi' value='"
										+ entry.agi
										+ "' type='text'></td><td><input class='gei' value='"
										+ entry.gei
										+ "' type='text'></td><td><input class='st' value='"
										+ entry.st
										+ "' type='text'></td><td><input class='ha' value='"
										+ entry.ha
										+ "' type='text'></td><td><input class='be' value='"
										+ entry.be
										+ "' type='text'></td><td><input class='ge' value='"
										+ entry.ge
										+ "' type='text'></td><td><input class='ve' value='"
										+ entry.ve
										+ "' type='text'></td><td><input class='au' value='"
										+ entry.au
										+ "' type='text'></td><td><input class='lebenskraft' value='"
										+ entry.lebenskraft
										+ "' type='text'></td><td><input class='abwehr' value='"
										+ entry.abwehr
										+ "' type='text'></td><td><input class='initiative' value='"
										+ entry.initiative
										+ "' type='text'></td><td><input class='laufen' value='"
										+ entry.laufen
										+ "' type='text'></td><td><input class='schlagen' value='"
										+ entry.schlagen
										+ "' type='text'></td><td><input class='schiessen' value='"
										+ entry.schiessen
										+ "' type='text'></td><td><input class='zaubern' value='"
										+ entry.zaubern
										+ "' type='text'></td><td><input class='zielzauber' value='"
										+ entry.zielzauber
										+ "' type='text'></td><td><div class='del'>X</div></td></tr>");
					});
			}
			_ds.html.diary.find("TR").remove();
			if (_ds.character.diary) {
			_ds.character.diary.forEach(function(entry, idx) {
				_ds.html.diary
				.append("<tr><td><input value='" + entry.name + "'/><textarea>" + entry.text + "</textarea></td><td><div class='del'>X</div></td></tr>");
			});
			$('#diary textarea').each(function () {
				  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
				}).on('input', function () {
				  this.style.height = 'auto';
				  this.style.height = (this.scrollHeight) + 'px';
				});
			
			}
			$("#attribute input").prop("readonly", true)
		},
		events : {
			char : {
				new : function() {
					$(".nr_chars")
					.unbind("click")
					.click(function() {
						_ds.html.chars
						.append("<tr><td><input type='submit' value='&Ouml;ffnen' class='load_char' id='char_" + _ds.data.characters.length + "'/></td><td>"
								+ "Neuer Charakter (1)"
								+ "</td></tr>");
						_ds.data.characters.push(new Character());
					});
				},
				load : function() {
					$(".load_char")
					.unbind("click")
					.click(function() {
						var id = $(this).attr("id").split("_")[1];
						_ds.data.index = id;
						_ds.data.load(_ds.data);
						$("#m_file").trigger("click");
					});
				}
			},
			deleteRow : function() {
				$(".del").unbind("click").click(function(elem) {
					$(this).closest("tr").remove();
				});
			},
			addRow : function() {
				$(".newrow")
						.unbind("click")
						.click(
								function() {
									var tablename = $(this).attr('class')
											.split("nr_")[1];
									id = "#" + tablename;
									var html = "";
									var deleteTD = "<td><div class='del'>X</div></td>";
									if (id === "#waffen") {
										html = "<tr><td><input class='name' type=text value=''></td><td><label class='checkbox'><input type='checkbox' class='nah' /><span class='checkmark'></span></label></td><td><label class='checkbox'><input type='checkbox' class='fern' /><span class='checkmark'></span></label></td><td><input class='Eigenschaften' type=text value=''></td><td><label class='checkbox'><input class='active' type='checkbox'/><span class='checkmark'></span></label></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#defense") {
										html = "<tr><td><input class='name' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td><td><label class='checkbox'><input class='active' type='checkbox'/><span class='checkmark'></span></label></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#spells") {
										html = "<tr><td><input class='name' type=text value=''></td><td><label class='checkbox'><input type='checkbox' class='nah' /><span class='checkmark'></span></label></td><td><label class='checkbox'><input type='checkbox' class='fern' /><span class='checkmark'></span></label></td><td><input class='Eigenschaften' type=text value=''></td><td><label class='checkbox'><input class='active' type='checkbox'/><span class='checkmark'></span></label></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#talents") {
										html = "<tr><td><input class='name' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td><td><input class='stufe' type=text value=''></td><td><label class='checkbox'><input class='active' type='checkbox'/><span class='checkmark'></span></label></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#inventar") {
										html = "<tr><td><input class='name' type=text value=''></td><td><input class='Wo' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#begleiter") {
										html = "<tr><td><input class='name' type=text value=''></td><td><input class='art' type=text value=''></td><td><input class='kor' type=text value=''></td><td><input class='agi' type=text value=''></td><td><input class='gei' type=text value=''></td><td><input class='st' type=text value=''></td><td><input class='ha' type=text value=''></td><td><input class='be' type=text value=''></td><td><input class='ge' type=text value=''></td><td><input class='ve' type=text value=''></td><td><input class='au' type=text value=''></td><td><input class='lebenskraft' type=text value=''></td><td><input class='abwehr' type=text value=''></td><td><input class='initiative' type=text value=''></td><td><input class='laufen' type=text value=''></td><td><input class='schlagen' type=text value=''></td><td><input class='schiessen' type=text value=''></td><td><input class='zaubern' type=text value=''></td><td><input class='zielzauber' type=text value=''></td>"
												+ deleteTD + "</tr>";
									} else if (id === "#diary") {
										html = "<tr><td><input value='Neuer Eintrag'/><textarea></textarea></td>"
											+ deleteTD + "</tr>";
								    }
									$(id + ' tbody').append(html);
									_ds.html.events.deleteRow();
								});
			},
			menu : function() {
				$(".menu > DIV").unbind("click").click(function() {
					$('#overlay').removeClass('hidden');
					$('#overlay > DIV').addClass('hidden');
					var id = $(this).attr('id').split('m_')[1];
					$('#' + id).removeClass('hidden');
					_ds.data.collect();
					_ds.stats.init();
					$("body").removeClass("print");
					$('#diary textarea').trigger("input");
					$('#diary textarea').trigger("input");
					$('#menuToggle INPUT').prop("checked", false);
				});
				$("#m_print").unbind("click").click(function() {
					_ds.data.collect();
					_ds.stats.init();
					$("body").toggleClass("print");
					if ($("body").hasClass("print")) {
						window.print();
					}
				});
			},
			select : function(id) {
				$("#ds_i_" + id + " input").unbind("change").change(
						function(val) {
							var max = Math.min(100, _ds.input(id).num());
							var html = "";
							for (var i = max; i > 0; i--) {
								html += "<option value='" + i + "'>" + i
										+ "</option>";
							}
							var old = $("#ds_i_" + id + " select").val();
							$("#ds_i_" + id + " select").html(html);

							$("#ds_i_" + id + " select").val(old);
						});
			},
			input : function() {
				$("#werte INPUT")
						.unbind("keydown")
						.keydown(
								function(e) {
									// Allow: backspace, delete, tab, escape,
									// enter and .
									if ($.inArray(e.which, [ 46, 8, 9, 27, 13,
											110, 190 ]) !== -1
											||
											// Allow: Ctrl+A, Command+A
											(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
											||
											// Allow: home, end, left, right,
											// down, up
											(e.keyCode >= 35 && e.keyCode <= 40)) {
										// let it happen, don't do anything
										return;
									}
									// Ensure that it is a number and stop the
									// keypress
									if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
											&& (e.keyCode < 96 || e.keyCode > 105)) {
										e.preventDefault();
									}
								});

				$("#werte INPUT").unbind("focusin").focusin(
						function() {
							$(this).addClass("focus");
							$(this).val(
									_ds.character[$(this).parent()
											.attr("class")
											.split("inputtofind ")[1]]);
						});
				$("#werte INPUT").unbind("focusout").focusout(
						function() {
							_ds.character[$(this).parent().attr("class").split(
									"inputtofind ")[1]] = $(this).val();
							$(this).removeClass("focus");
							_ds.stats.init();
						});
				$("#ds_i_exp").unbind("change").change(function(e) {
					_ds.stats.stufe();
				});
			},
			gold : function() {
				$(".t_calc .minus").unbind("click").click(function() {
					_ds.gold.calc.minus();
				});
				$(".t_calc .plus").unbind("click").click(function() {
					_ds.gold.calc.plus();
				});
			},
			file : function() {
				$("#ds_i_save").unbind("click").click(function() {
					_ds.data.save();
				});

				$("#ds_i_export").unbind("click").click(function() {
					_ds.data.export();
				});

				$("#ds_i_import").unbind("click").click(function() {
					_ds.data.import();
				});

				$("#ds_i_new").unbind("click").click(function() {
					_ds.data.clear();
					location.reload();
				});
			},
			modal : {
				close : function() {
					$("#modal").hide();
					$("#modal .dialog .before").remove();
					$("#modal .dialog").prepend("<div class='before'>X</div>");
					$("#modal .dialog .before").unbind("click").click(
							function() {
								$("#modal").hide();
							});
				},
				open : function(id, on) {
					$(id).unbind(on).on(on, function() {
						$("#modal").show();
					});
				},
				dialog : {
					exp : {
						add : function() {
							$("#modal .dialog.addexp .button")
									.unbind("click")
									.click(
											function() {
												var add = _ds.input("addexp")
														.num();
												_ds.input("addexp").set("");
												var orig = _ds.input("exp")
														.num();
												_ds.input("exp")
														.set(add + orig);
												$(
														"#modal .dialog.addexp .before")
														.click();
											});
						}
					}
				}
			},
			depending : {
				volk : function() {
					$("#ds_i_volk INPUT")
							.unbind("change")
							.change(
									function() {
										var val = $(this).val();
										var text = _ds
												.input("volksfahigkeiten")
												.text();
										switch (val) {
										case "Elf": {
											text = "Leichtf�ssig, Nachtsicht, Unsterblich";
											break;
										}
										case "Mensch": {
											text = "1 Talentpunkt gratis";
											break;
										}
										case "Zwerg": {
											text = "Dunkelsicht, Langlebig, Z�h";
											break;
										}
										case "Halbling": {
											text = "Geschwind, Klein, Leichtf��ig, Magieresistent, Talentiert, Z�her als sie aussehen";
										}
										case "Gnom": {
											text = "Dunkelsicht oder Nachtsicht, Klein, Langlebig, Magisch begabt, Z�h oder Schnell, Z�her als sie aussehen, ggf. Tollpatschig";
											break;
										}
										default:
											break;
										}

										_ds.input("volksfahigkeiten").set(text);
									});
					$("#ds_i_volk SELECT").unbind("change").change(function() {
						_ds.input("volk").set($(this).val());
					});
				}
			}
		},
		init : function() {
			_ds.html.html();
			_ds.html.events.char.new();
			_ds.html.events.char.load();
			_ds.html.events.deleteRow();
			_ds.html.events.addRow();
			_ds.html.events.menu();
			_ds.html.events.select("lebenskraft");
			_ds.html.events.select("mana");
			_ds.html.events.input();
			_ds.html.events.gold();
			_ds.html.events.file();
			_ds.html.events.modal.close();
			_ds.html.events.modal.open("#ds_i_exp input", "focus");
			_ds.html.events.modal.dialog.exp.add();
			_ds.html.events.depending.volk();
		}

	}
}