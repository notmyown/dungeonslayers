function DS() {
	var _ds = this;
	this.character = new Character();
	//this.character.init("Olwil", 2, 4,7,8,0,1,0,2,5,6);
	//this.character.print();
	this.pre = ['Körper', 'Agilität', 'Geist', 'Stärke', 'Bewegung', 'Verstand', 'Härte', 'Geschick', 'Aura', 'Panzerung'];
	
	this.readFromFile = function(file) {
		$.ajax({
  url: "character.json",
  dataType: "json",
  success: function(data){
	  _ds.character = data;
	  _ds.calcHTML();
	  _ds.calcStats();
  }
});
	}
	
	this.input = function(path) {
		this.set = function(val) {
		  $("#ds_i_" + path + " INPUT").val(val);
		}
		this.text = function() {
		  return $("#ds_i_" + path + " INPUT").val();
		}
		this.num = function() {
		  return Number($("#ds_i_" + path + " INPUT").val());
		}
		return this;
	}
	
	this.fillDefaults = function(character) {
		this.input('koerper').set(character.kor);
		this.input('agilitaet').set(character.agi);
		this.input('geist').set(character.gei);
		this.input('staerke').set(character.st);
		this.input('haerte').set(character.ha);
		this.input('bewegung').set(character.be);
		this.input('geschick').set(character.ge);
		this.input('verstand').set(character.ve);
		this.input('aura').set(character.au);
		this.input('name').set(character.name);
		this.input('stufe').set(character.stufe);
		this.input('panzerung').set(0);
	}
	
	this.newRow = function(id) {
		$(id + ' tbody').append("<tr><td><input class='name' type=text value=''></td><td><input type='checkbox' class='nah' /></td><td><input type='checkbox' class='fern' /></td><td><input class='Eigenschaften' type=text value=''><input class='Stufe' type=text value=''></td><td><input class='active' type='checkbox'/></td></tr>");
	}
	this.calcHTML = function() {
		var weapons = $('#waffen TBODY');
		var defense = $('#defense TBODY');
		var talents = $('#talents TBODY');
		var spells = $('#spells TBODY');
		_ds.character.weapons.forEach(function(entry) {
			weapons.append("<tr><td><input class='name' type=text value='" + entry.name + "'></td><td><input type='checkbox' class='nah' " + (entry.nah ? "checked" : "") + "/></td><td><input type='checkbox' class='fern' + " + (entry.fern ? "checked" : "") + " /></td><td><input class='Eigenschaften' type=text value='" + entry.attributes + "'></td><td><input class='active' type='checkbox' " + (entry.active ? "checked" : "") + "/></td></tr>");
		});
		_ds.character.defense.forEach(function(entry) {
			defense.append("<tr><td><input class='name' type=text value='" + entry.name + "'></td><td><input type='checkbox' class='nah' " + (entry.nah ? "checked" : "") + "/></td><td><input type='checkbox' class='fern' + " + (entry.fern ? "checked" : "") + " /></td><td><input class='Eigenschaften' type=text value='" + entry.attributes + "'></td><td><input class='active' type='checkbox' " + (entry.active ? "checked" : "") + "/></td></tr>");
		});
		_ds.character.talents.forEach(function(entry) {
			talents.append("<tr><td><input class='name' type=text value='" + entry.name + "'></td><td><input type='checkbox' class='nah' " + (entry.nah ? "checked" : "") + "/></td><td><input type='checkbox' class='fern' + " + (entry.fern ? "checked" : "") + " /></td><td><input class='Eigenschaften' type=text value='" + entry.attributes + "'><input class='stufe' type=text value='" + entry.rang + "'></td><td><input class='active' type='checkbox' " + (entry.active ? "checked" : "") + "/></td></tr>");
		});
		_ds.character.spells.forEach(function(entry) {
			spells.append("<tr><td><input class='name' type=text value='" + entry.name + "'></td><td><input type='checkbox' class='nah' " + (entry.nah ? "checked" : "") + "/></td><td><input type='checkbox' class='fern' + " + (entry.fern ? "checked" : "") + " /></td><td><input class='Eigenschaften' type=text value='" + entry.attributes + "'></td><td><input class='active' type='checkbox' " + (entry.active ? "checked" : "") + "/></td></tr>");
		});
	}
	this.calcStats = function() {
		this.lebenskraft = function () {
			var val = this.input('koerper').num() + this.input('haerte').num() + 10;
			this.input('lebenskraft').set(val);
			return val;
		}
		this.abwehr = function () {
			var val = this.input('koerper').num() + this.input('haerte').num() + this.input('panzerung').num();
			this.input('abwehr').set(val);
			return val;
		}
		this.initiative = function () {
			var val = this.input('agilitaet').num() + this.input('bewegung').num() + 0;
			this.input('initiative').set(val);
			return val;
		}
		this.laufen = function () {
			var val = (this.input('agilitaet').num() / 2 ) + 1;
			this.input('laufen').set(val);
			return val;
		}
		this.schlagen = function () {
			var val = this.input('koerper').num() + this.input('staerke').num();
			this.input('schlagen').set(val);
			return val;
		}
		this.schiessen = function () {
			var val = this.input('agilitaet').num() + this.input('geschick').num();
			this.input('schiessen').set(val);
			return val;
		}
		this.zaubern = function () {
			var val = this.input('geist').num() + this.input('aura').num() - this.input('panzerung').num() + this.input('zb_nah').num();
			this.input('zaubern').set(val);
			return val;
		}
		this.zielzauber = function () {
			var val = this.input('geist').num() + this.input('geschick').num() - this.input('panzerung').num() + this.input('zb_fern').num();
			this.input('zielzauber').set(val);
			return val;
		}
		this.mana = function () {
			var val = this.input('geist').num() + this.input('aura').num() + this.input('stufe').num();
			this.input('mana').set(val);
			return val;
		}
		
		this.tables = function(id, pre) {
			var rows = $(id +" tbody tr").each(function() {
				var row = $(this);
				if (row.find('.active').prop('checked')) {
					var txt = row.find('.Eigenschaften').val();
					txt = txt.split(';');
					txt.forEach(function(entry) {
						entry = entry.trim();
						var plus = entry.split('+');
						if (plus[1]) {
							
							var multiply = 1;
							if (row.find('.stufe')[0]) {
								multiply = Number(row.find('.stufe').val());
							}
							if ((pre && _ds.pre.indexOf(plus[0].trim())<0) || (!pre && _ds.pre.indexOf(plus[0].trim())>-1) ) {
								multiply = 0;
							}
							if (plus[0].trim() == 'ZB') {
								if(row.find('.nah').prop('checked')) {
									$('#ds_i_zaubern input').val(Number($('#ds_i_zaubern input').val()) + (Number(plus[1])*multiply));
								}
								if(row.find('.fern').prop('checked')) {
									$('#ds_i_zielzauber input').val(Number($('#ds_i_zielzauber input').val()) + (Number(plus[1])*multiply));
								}
							} else if (plus[0].trim() == 'WB') {
								if(row.find('.nah').prop('checked')) {
									$('#ds_i_schlagen input').val(Number($('#ds_i_schlagen input').val()) + (Number(plus[1])*multiply));
								}
								if(row.find('.fern').prop('checked')) {
									$('#ds_i_schiessen input').val(Number($('#ds_i_schiessen input').val()) + (Number(plus[1])*multiply));
								}
							} else {
								$('div.inputtofind').each(function() {
									console.log($(this).text());
									if($(this).text().startsWith(plus[0].trim())) {
										$(this).find('input').val(Number($(this).find('input').val()) + (Number(plus[1])*multiply));
									}
								});
							}
						}
					});
				}
			})

		}
		_ds.fillDefaults(this.character);
		this.tables(".inventory", true);
		this.lebenskraft();
		this.abwehr();
		this.initiative();
		this.laufen();
		this.schlagen();
		this.schiessen();
		this.zaubern();
		this.zielzauber();
		this.mana();
		this.tables(".inventory", false);
	}
	
	$("#click").click(function() {
		_ds.calcStats();
	});
	$(".newrow").click(function() {
		var tablename = $(this).attr('class').split("nr_")[1];
		_ds.newRow("#" + tablename);
	});
	
	$(".menu > DIV").click(function() {
		$('#overlay').removeClass('hidden');
		$('#overlay > DIV').addClass('hidden');
		var id = $(this).attr('id').split('m_')[1];
		$('#' + id).removeClass('hidden');
		_ds.calcStats();
	});
	
	this.readFromFile("file://character.json");
	$("#overlay").removeClass('hidden');
	$("#overlay > DIV").addClass('hidden');
	$("#werte").removeClass('hidden');
}