function DS() {
  var _ds = this;
  this.character = new Character();
  // this.character.init("Olwil", 2, 4,7,8,0,1,0,2,5,6);
  // this.character.print();
  this.pre = [ 'Körper', 'Agilität', 'Geist', 'Stärke', 'Bewegung', 'Verstand',
      'Härte', 'Geschick', 'Aura', 'Panzerung' ];

  this.gold = {
    g : $("#g_current_g"),
    s : $("#g_current_s"),
    k : $("#g_current_k"),
    g_new : $(".g_new_g"),
    s_new : $(".g_new_s"),
    k_new : $(".g_new_k"),
    value : _ds.character.gold,
    calc : {
      g_v : 0,
      s_v : 0,
      k_v : 0,
      g_n_v : 0,
      s_n_v : 0,
      k_n_v : 0,
      init : function g_calc_init() {
        _ds.gold.calc.g_v = Number(_ds.gold.g.text());
        _ds.gold.calc.s_v = Number(_ds.gold.s.text());
        _ds.gold.calc.k_v = Number(_ds.gold.k.text());
        _ds.gold.value = 100 * _ds.gold.calc.g_v + 10 * _ds.gold.calc.s_v
            + _ds.gold.calc.k_v;
        _ds.gold.calc.g_n_v = Number(_ds.gold.g_new.val());
        _ds.gold.calc.s_n_v = Number(_ds.gold.s_new.val());
        _ds.gold.calc.k_n_v = Number(_ds.gold.k_new.val());
      },
      set : function g_calcset(multiply) {
        _ds.gold.calc.init();
        _ds.gold.calc.val(multiply);
        _ds.gold.calc.clear();
      },
      val : function g_calcset(multiply) {
        var sum = multiply
            * (100 * _ds.gold.calc.g_n_v + 10 * _ds.gold.calc.s_n_v + _ds.gold.calc.k_n_v);
        _ds.gold.value += sum;

        var g_mod = _ds.gold.value % 100;
        var g_over = (_ds.gold.value - g_mod) / 100;
        _ds.gold.g.html(g_over);
        var s_mod = g_mod % 10;
        var s_over = (g_mod - s_mod) / 10;
        _ds.gold.s.html(s_over);
        _ds.gold.k.html(s_mod);
      },
      minus : function g_c_minus() {
        _ds.gold.calc.set(-1);
      },
      plus : function g_c_plus() {
        _ds.gold.calc.set(1);
      },
      clear : function g_c_clear() {
        _ds.gold.g_new.val("");
        _ds.gold.s_new.val("");
        _ds.gold.k_new.val("");
        _ds.gold.g_n_v = 0;
      }
    }
  }

  this.data = {
    characters : [],

    load : function data_load() {
      var obj = localStorage.getItem("nmo.dungeonslayers.characters")
      if (obj) {
        var data = JSON.parse(obj);
      }
      if (data && data.characters && data.characters[0]) {
        $(data.characters).each(function(index, value) {
          _ds.data.characters.push(value);
        });
      } else {
        _ds.data.characters.push(new Character());
      }
      _ds.character = _ds.data.characters[0];
      _ds.calcHTML();
      _ds.calcStats();
    },
    save : function data_save() {
      _ds.data.collect();
      var data = {
        characters : []
      };
      data.characters.push(_ds.character);
      localStorage.setItem("nmo.dungeonslayers.characters", JSON
          .stringify(data));
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
      _ds.character.volksfahigkeiten = _ds.input("volksfahigkeiten").text();
      _ds.character.exp = _ds.input("exp").num();
      _ds.character.heldenklasse = _ds.input("heldenklasse").text();
      _ds.character.gold = _ds.gold.value;
      _ds.character.weapons = [];
      var list = $('#waffen TBODY TR');
      list.each(function(index, elem) {
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
      list.each(function(index, elem) {
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
      list.each(function(index, elem) {
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
      list.each(function(index, elem) {
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
      console.log(_ds.character);
    }
  }

  this.input = function(path) {
    this.set = function(val) {
      $("#ds_i_" + path + " INPUT").val(val);
      $("#ds_i_" + path + " INPUT").trigger("change");
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
    this.input('lp').set(character.lp);
    this.input('exp').set(character.exp);
    this.input('tp').set(character.tp);
    this.input('player').set(character.player);
    this.input('volk').set(character.volk);
    this.input('klasse').set(character.klasse);
    this.input('heldenklasse').set(character.heldenklasse);
    this.input('volksfahigkeiten').set(character.volksfahigkeiten);
    this.input('panzerung').set(0);
    $('TR.inputtofind').each(function() {
      $(this).find(".outline").html("0");
    });
    // this.gold.calc.init();
    // _ds.character.gold = _ds.gold.value;
    this.gold.value = character.gold;
    this.gold.calc.val(0);
  }

  this.newRow = function(id) {
    var html = "";
    var deleteTD = "<td><div class='del'>X</div></td>";
    if (id === "#waffen") {
      html = "<tr><td><input class='name' type=text value=''></td><td><input type='checkbox' class='nah' /></td><td><input type='checkbox' class='fern' /></td><td><input class='Eigenschaften' type=text value=''></td><td><input class='active' type='checkbox'/></td>"
          + deleteTD + "</tr>";
    } else if (id === "#defense") {
      html = "<tr><td><input class='name' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td><td><input class='active' type='checkbox'/></td>"
          + deleteTD + "</tr>";
    } else if (id === "#spells") {
      html = "<tr><td><input class='name' type=text value=''></td><td><input type='checkbox' class='nah' /></td><td><input type='checkbox' class='fern' /></td><td><input class='Eigenschaften' type=text value=''></td><td><input class='active' type='checkbox'/></td>"
          + deleteTD + "</tr>";
    } else if (id === "#talents") {
      html = "<tr><td><input class='name' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td><td><input class='stufe' type=text value=''></td><td><input class='active' type='checkbox'/></td>"
          + deleteTD + "</tr>";
    } else if (id === "#inventar") {
      html = "<tr><td><input class='name' type=text value=''></td><td><input class='Wo' type=text value=''></td><td><input class='Eigenschaften' type=text value=''></td>"
          + deleteTD + "</tr>";
    }
    $(id + ' tbody').append(html);
    _ds.setDelClick();
  }

  this.calcHTML = function() {
    var weapons = $('#waffen TBODY');
    var defense = $('#defense TBODY');
    var talents = $('#talents TBODY');
    var spells = $('#spells TBODY');
    var inventar = $('#inventar TBODY');
    weapons.find("TR").remove();
    _ds.character.weapons.forEach(function(entry) {
      weapons.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "")
          + "/></td><td><div class='del'>X</div></td></tr>");
    });
    defense.find("TR").remove();
    _ds.character.defense.forEach(function(entry) {
      defense.append("<tr><td><input class='name' type=text value='"
          + entry.name
          + "'></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "")
          + "/></td><td><div class='del'>X</div></td></tr>");
    });
    talents.find("TR").remove();
    _ds.character.talents.forEach(function(entry) {
      talents.append("<tr><td><input class='name' type=text value='"
          + entry.name
          + "'></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='stufe' type=text value='" + entry.rang
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "")
          + "/></td><td><div class='del'>X</div></td></tr>");
    });
    spells.find("TR").remove();
    _ds.character.spells.forEach(function(entry) {
      spells.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "")
          + "/></td><td><div class='del'>X</div></td></tr>");
    });
    inventar.find("TR").remove();
    _ds.character.inventar
        .forEach(function(entry) {
          inventar.append("<tr><td><input class='name' type=text value='"
              + entry.name + "'></td><td><input class='Wo' type=text value='"
              + entry.wo
              + "'></td><td><input class='Eigenschaften' type=text value='"
              + entry.attributes
              + "'></td><td><div class='del'>X</div></td></tr>");
        });
    _ds.setDelClick();
  }
  this.setDelClick = function() {
    $(".del").unbind("click").click(function(elem) {
      $(this).closest("tr").remove();
    });
  }
  this.calcStats = function(nodefault) {
    this.lebenskraft = function() {
      var val = this.input('koerper').num() + this.input('haerte').num() + 10;
      this.input('lebenskraft').set(val);
      return val;
    }
    this.abwehr = function() {
      var val = this.input('koerper').num() + this.input('haerte').num()
          + this.input('panzerung').num();
      this.input('abwehr').set(val);
      return val;
    }
    this.initiative = function() {
      var val = this.input('agilitaet').num() + this.input('bewegung').num()
          + 0;
      this.input('initiative').set(val);
      return val;
    }
    this.laufen = function() {
      var val = (this.input('agilitaet').num() / 2) + 1;
      this.input('laufen').set(val);
      return val;
    }
    this.schlagen = function() {
      var val = this.input('koerper').num() + this.input('staerke').num();
      this.input('schlagen').set(val);
      return val;
    }
    this.schiessen = function() {
      var val = this.input('agilitaet').num() + this.input('geschick').num();
      this.input('schiessen').set(val);
      return val;
    }
    this.zaubern = function() {
      var val = this.input('geist').num() + this.input('aura').num()
          - this.input('panzerung').num() + this.input('zb_nah').num();
      this.input('zaubern').set(val);
      return val;
    }
    this.zielzauber = function() {
      var val = this.input('geist').num() + this.input('geschick').num()
          - this.input('panzerung').num() + this.input('zb_fern').num();
      this.input('zielzauber').set(val);
      return val;
    }
    this.mana = function() {
      var val = this.input('geist').num() + this.input('aura').num()
          + this.input('stufe').num();
      this.input('mana').set(val);
      return val;
    }

    this.tables = function(id, pre, probs) {
      var rows = $(id + " tbody tr").each(
          function() {
            var row = $(this);
            if (row.find('.active').prop('checked')) {
              var txt = row.find('.Eigenschaften').val();
              txt = txt.split(';');
              txt.forEach(function(entry) {
                entry = entry.trim();
                var plus = entry.split('+');
                var vorzeichen = 1;
                if (!plus[1]) {
                  plus = entry.split('-');
                  vorzeichen = -1;
                }
                if (plus[0] && plus[0].trim().length > 0) {

                  if (plus[1] && plus[1].trim().length > 0) {

                    var multiply = 1;
                    if (row.find('.stufe')[0]) {
                      multiply = Number(row.find('.stufe').val());
                    }
                    if ((pre && _ds.pre.indexOf(plus[0].trim()) < 0)
                        || (!pre && _ds.pre.indexOf(plus[0].trim()) > -1)) {
                      multiply = 0;
                    }
                    multiply *= vorzeichen;
                    if (!probs) {
                      if (plus[0].trim() == 'ZB') {
                        if (row.find('.nah').length == 0 && row.find('.fern').length == 0) {
                          $('#ds_i_zaubern input').val(
                              Number($('#ds_i_zaubern input').val())
                                  + (Number(plus[1]) * multiply));
                          $('#ds_i_zielzauber input').val(
                              Number($('#ds_i_zielzauber input').val())
                                  + (Number(plus[1]) * multiply));
                        }
                        if (row.find('.nah').prop('checked')) {
                          $('#ds_i_zaubern input').val(
                              Number($('#ds_i_zaubern input').val())
                                  + (Number(plus[1]) * multiply));
                        }
                        if (row.find('.fern').prop('checked')) {
                          $('#ds_i_zielzauber input').val(
                              Number($('#ds_i_zielzauber input').val())
                                  + (Number(plus[1]) * multiply));
                        }
                      } else if (plus[0].trim() == 'WB') {
                        if (row.find('.nah').prop('checked')) {
                          $('#ds_i_schlagen input').val(
                              Number($('#ds_i_schlagen input').val())
                                  + (Number(plus[1]) * multiply));
                        }
                        if (row.find('.fern').prop('checked')) {
                          $('#ds_i_schiessen input').val(
                              Number($('#ds_i_schiessen input').val())
                                  + (Number(plus[1]) * multiply));
                        }
                      } else {
                        $('div.inputtofind').each(
                            function() {
                              if (plus[0].trim().length > 0
                                  && $(this).text().trim().startsWith(
                                      plus[0].trim())) {
                                $(this).find('input').val(
                                    Number($(this).find('input').val())
                                        + (Number(plus[1]) * multiply));
                              }
                            });

                      }
                    } else {
                      $('#probs TR').each(
                          function() {
                            if (plus[0].trim().length > 0
                                && $(this).text().trim().startsWith(
                                    plus[0].trim())) {
                              $(this).find('.outline').text(
                                  Number($(this).find('.outline').text())
                                      + (Number(plus[1]) * multiply));
                            }
                          });

                    }
                  }
                }
              });
            }
          })

    }
    this.probes = function() {
      this.bemerken = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        val = (val < 8) ? 8 : val;
        $("#p_bemerken").html(val);
      };
      this.bemerken();
      this.darbieten = function() {
        //
      };
      this.darbieten();
      this.erwachen = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        $("#p_erwachen").html(val);
      };
      this.erwachen();
      this.fallenentscharfen = function() {
        var val = _ds.input("geist").num() + _ds.input('geschick').num();
        $("#p_fallen").html(val);
      };
      this.fallenentscharfen();
      this.feilschen = function() {
        var val = _ds.input("geist").num()
            + Math.max(_ds.input('verstand').num(), _ds.input('aura').num());
        $("#p_feilschen").html(val);
      };
      this.feilschen();
      this.feuer = function() {
        var val = _ds.input("geist").num() + _ds.input('geschick').num();
        $("#p_feuer").html(val);
      };
      this.feuer();
      this.flirten = function() {
        var val = _ds.input("geist").num() + _ds.input('aura').num();
        $("#p_flirten").html(val);
      };
      this.flirten();
      this.gift = function() {
        var val = _ds.input("koerper").num() + _ds.input('haerte').num();
        $("#p_gift").html(val);
      };
      this.gift();
      this.inschrift = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        $("#p_inschrift").html(val);
      };
      this.inschrift();
      this.klettern = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('staerke').num();
        $("#p_klettern").html(val);
      };
      this.klettern();
      this.kraftakt = function() {
        var val = _ds.input("koerper").num() + _ds.input('staerke').num();
        $("#p_kraftakt").html(val);
      };
      this.kraftakt();
      this.krankheit = function() {
        var val = _ds.input("koerper").num() + _ds.input('haerte').num();
        $("#p_krankheit").html(val);
      };
      this.krankheit();
      this.mechanismus = function() {
        var val = _ds.input("geist").num()
            + Math
                .max(_ds.input('geschick').num(), _ds.input('verstand').num());
        $("#p_mechanismus").html(val);
      };
      this.mechanismus();
      this.reiten = function() {
        var val = _ds.input("agilitaet").num()
            + Math.max(_ds.input('bewegung').num(), _ds.input('aura').num());
        $("#p_reiten").html(val);
      };
      this.reiten();
      this.schatzen = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        $("#p_schatzen").html(val);
      };
      this.schatzen();
      this.schleichen = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
        $("#p_schleichen").html(val);
      };
      this.schleichen();
      this.schlosser = function() {
        var val = _ds.input("geist").num() + _ds.input('geschick').num();
        $("#p_schlosser").html(val);
      };
      this.schlosser();
      this.schwimmen = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
        $("#p_schwimmen").html(val);
      };
      this.schwimmen();
      this.springen = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
        $("#p_springen").html(val);
      };
      this.springen();
      this.spuren = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        $("#p_spuren").html(val);
      };
      this.spuren();
      this.suchen = function() {
        var val = Math.max(_ds.input("geist").num()
            + _ds.input('verstand').num(), 8);
        $("#p_suchen").html(val);
      };
      this.suchen();
      this.taschendiebstahl = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('geschick').num();
        $("#p_taschendiebstahl").html(val);
      };
      this.taschendiebstahl();
      this.verbergen = function() {
        var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
        $("#p_verbergen").html(val);
      };
      this.verbergen();
      this.verstandigen = function() {
        var val = _ds.input("geist").num() + _ds.input('geschick').num();
        $("#p_verstandigen").html(val);
      };
      this.verstandigen();
      this.wissen = function() {
        var val = _ds.input("geist").num() + _ds.input('verstand').num();
        $("#p_wissen").html(val);
      };
      this.wissen();
    }
    if (!nodefault) {
      _ds.fillDefaults(this.character);
    }
    this.tables(".inventory", true, false);
    this.lebenskraft();
    this.abwehr();
    this.initiative();
    this.laufen();
    this.schlagen();
    this.schiessen();
    this.zaubern();
    this.zielzauber();
    this.mana();
    this.tables(".inventory", false, false);
    this.probes();
    this.tables(".inventory", false, true);
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
    _ds.data.collect();
    _ds.calcStats();
  });

  $("#ds_i_lebenskraft input").change(function(val) {
    var max = Math.min(100, _ds.input("lebenskraft").num());
    var html = "";
    for (var i = max; i > 0; i--) {
      html += "<option value='" + i + "'>" + i + "</option>";
    }
    var old = $("#ds_i_lebenskraft select").val();
    $("#ds_i_lebenskraft select").html(html);

    $("#ds_i_lebenskraft select").val(old);
  });
  $("#ds_i_mana input").change(function(val) {
    var max = Math.min(100, _ds.input("mana").num());
    var html = "";
    for (var i = max; i > 0; i--) {
      html += "<option value='" + i + "'>" + i + "</option>";
    }
    var old = $("#ds_i_mana select").val();
    $("#ds_i_mana select").html(html);

    $("#ds_i_mana select").val(old);
  });

  $(".t_calc .minus").click(function() {
    _ds.gold.calc.minus();
  });
  $(".t_calc .plus").click(function() {
    _ds.gold.calc.plus();
  });

  $("#werte INPUT").keydown(
      function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.which, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
            && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });

  $("#werte INPUT").focusin(
      function() {
        $(this).addClass("focus");
        $(this)
            .val(
                _ds.character[$(this).parent().attr("class").split(
                    "inputtofind ")[1]]);
      });
  $("#werte INPUT")
      .focusout(
          function() {
            _ds.character[$(this).parent().attr("class").split("inputtofind ")[1]] = $(
                this).val();
            $(this).removeClass("focus");
            _ds.calcStats();
          });

  $("#ds_i_save").click(function() {
    _ds.data.save();
    //location.reload();
  });
  
  $("#ds_i_export").click(function() {
    _ds.data.collect();
    var file = new File([JSON.stringify(_ds.character)], "dungeonslayers.json", {type: "text/plain;charset=utf-8"});
    saveAs(file);
  });
  
  $("#ds_i_import").click(function() {
    var inputElement = document.createElement("input");
    // Set its type to file
    inputElement.type = "file";
    // Set accept to the file types you want the user to select. 
    // Include both the file extension and the mime type
    inputElement.accept = "json";

    // set onchange event to call callback when user has selected file
    inputElement.addEventListener("change", function() {
      $.ajax({
        url : "character.json",
        dataType : "json",
        success : function(data) {
          _ds.character = data;
          _ds.calcHTML();
          _ds.calcStats();
        }
      });
    });

    // dispatch a click event to open the file dialog
    inputElement.dispatchEvent(new MouseEvent("click")); 
  });

  $("#ds_i_new").click(function() {
    _ds.data.clear();
    location.reload();
  });

  $("#attribute input").prop("readonly", true)

  // this.readFromFile("file://character.json");
  this.data.load();
  $("#m_file").trigger("click");
}