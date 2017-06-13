﻿function DS() {
  var _ds = this;
  this.character = new Character();
  // this.character.init("Olwil", 2, 4,7,8,0,1,0,2,5,6);
  // this.character.print();
  this.pre = [ 'Körper', 'Agilität', 'Geist', 'Stärke', 'Bewegung', 'Verstand',
      'Härte', 'Geschick', 'Aura', 'Panzerung' ];

  this.readFromFile = function(file) {
    $.ajax({
      url : "character.json",
      dataType : "json",
      success : function(data) {
        _ds.character = data;
        _ds.calcHTML();
        _ds.calcStats();
      }
    });
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
    this.input('panzerung').set(0);
    $('TR.inputtofind').each(function() {
      $(this).find(".outline").html("0");
    });
  }

  this.newRow = function(id) {
    $(id + ' tbody')
        .append(
            "<tr><td><input class='name' type=text value=''></td><td><input type='checkbox' class='nah' /></td><td><input type='checkbox' class='fern' /></td><td><input class='Eigenschaften' type=text value=''><input class='Stufe' type=text value=''></td><td><input class='active' type='checkbox'/></td></tr>");
  }
  this.calcHTML = function() {
    var weapons = $('#waffen TBODY');
    var defense = $('#defense TBODY');
    var talents = $('#talents TBODY');
    var spells = $('#spells TBODY');
    _ds.character.weapons.forEach(function(entry) {
      weapons.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "") + "/></td></tr>");
    });
    _ds.character.defense.forEach(function(entry) {
      defense.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "") + "/></td></tr>");
    });
    _ds.character.talents.forEach(function(entry) {
      talents.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='stufe' type=text value='" + entry.rang
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "") + "/></td></tr>");
    });
    _ds.character.spells.forEach(function(entry) {
      spells.append("<tr><td><input class='name' type=text value='"
          + entry.name + "'></td><td><input type='checkbox' class='nah' "
          + (entry.nah ? "checked" : "")
          + "/></td><td><input type='checkbox' class='fern' + "
          + (entry.fern ? "checked" : "")
          + " /></td><td><input class='Eigenschaften' type=text value='"
          + entry.attributes
          + "'></td><td><input class='active' type='checkbox' "
          + (entry.active ? "checked" : "") + "/></td></tr>");
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
                            console.log(plus[0] + " + " + plus[1] + " / "
                                + $(this).text().trim());
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

  this.gold = {
    g : $("#g_current_g"),
    s : $("#g_current_s"),
    k : $("#g_current_k"),
    g_new : $(".g_new_g"),
    s_new : $(".g_new_s"),
    k_new : $(".g_new_k"),
    value : 0,
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
        _ds.gold.value = 100 * _ds.gold.calc.g_v + 10 *_ds.gold.calc.s_v + _ds.gold.calc.k_v;
        _ds.gold.calc.g_n_v = Number(_ds.gold.g_new.val());
        _ds.gold.calc.s_n_v = Number(_ds.gold.s_new.val());
        _ds.gold.calc.k_n_v = Number(_ds.gold.k_new.val());        
      },
      set : function g_calcset(multiply) {
        _ds.gold.calc.init();
        var sum = multiply * (100 * _ds.gold.calc.g_n_v + 10 * _ds.gold.calc.s_n_v + _ds.gold.calc.k_n_v);
        _ds.gold.value += sum;
        
        var g_mod = _ds.gold.value % 100;
        var g_over = (_ds.gold.value - g_mod) / 100;
        _ds.gold.g.html(g_over);
        var s_mod = g_mod % 10;
        var s_over = (g_mod - s_mod) / 10;
        _ds.gold.s.html(s_over);
        _ds.gold.k.html(s_mod);
        
        _ds.gold.calc.clear();
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
      }
    }
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

  $("#ds_i_lebenskraft input").change(function(val) {
    var max = _ds.input("lebenskraft").num();
    var html = "";
    for (var i = max; i > 0; i--) {
      html += "<option value='" + i + "'>" + i + "</option>";
    }
    var old = $("#ds_i_lebenskraft select").val();
    $("#ds_i_lebenskraft select").html(html);

    $("#ds_i_lebenskraft select").val(old);
  });
  $("#ds_i_mana input").change(function(val) {
    var max = _ds.input("mana").num();
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
  
  $("#werte INPUT").keydown(function(e) {
 // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.which, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
         // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
  });
  
  $("#werte INPUT").focusin(function() {
    $(this).addClass("focus");
    $(this).val(_ds.character[$(this).parent().attr("class").split("inputtofind ")[1]]);
  });
  $("#werte INPUT").focusout(function() {
    _ds.character[$(this).parent().attr("class").split("inputtofind ")[1]] = $(this).val();
    $(this).removeClass("focus");
    _ds.calcStats();
  });
  
  this.readFromFile("file://character.json");
  $("#overlay").removeClass('hidden');
  $("#overlay > DIV").addClass('hidden');
  $("#werte").removeClass('hidden');
}