function StatsHandler(_ds) {
  this.stats = {
      lebenskraft : function calcstat_lebenskraft() {
        var val = _ds.input('koerper').num() + _ds.input('haerte').num() + 10;
        _ds.input('lebenskraft').set(val);
        return val;
      },
      abwehr : function calcstat_abwehr() {
        var val = _ds.input('koerper').num() + _ds.input('haerte').num()
            + _ds.input('panzerung').num();
        _ds.input('abwehr').set(val);
        return val;
      },
      initiative : function() {
        var val = _ds.input('agilitaet').num() + _ds.input('bewegung').num() + 0;
        _ds.input('initiative').set(val);
        return val;
      },
      laufen : function() {
        var val = (_ds.input('agilitaet').num() / 2) + 1;
        _ds.input('laufen').set(val);
        return val;
      },
      schlagen : function() {
        var val = _ds.input('koerper').num() + _ds.input('staerke').num();
        _ds.input('schlagen').set(val);
        return val;
      },
      schiessen : function() {
        var val = _ds.input('agilitaet').num() + _ds.input('geschick').num();
        _ds.input('schiessen').set(val);
        return val;
      },
      zaubern : function() {
        var val = _ds.input('geist').num() + _ds.input('aura').num()
            - _ds.input('panzerung').num() + _ds.input('zb_nah').num();
        _ds.input('zaubern').set(val);
        return val;
      },
      zielzauber : function() {
        var val = _ds.input('geist').num() + _ds.input('geschick').num()
            - _ds.input('panzerung').num() + _ds.input('zb_fern').num();
        _ds.input('zielzauber').set(val);
        return val;
      },
      mana : function() {
        var val = _ds.input('geist').num() + _ds.input('aura').num()
            + _ds.input('stufe').num();
        _ds.input('mana').set(val);
        return val;
      },
      tables : function(id, pre, probs) {
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
                          if (row.find('.nah').length == 0
                              && row.find('.fern').length == 0) {
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
      },
      probes : {
        init : function() {
          _ds.stats.probes.bemerken();
          _ds.stats.probes.darbieten();
          _ds.stats.probes.erwachen();
          _ds.stats.probes.fallenentscharfen();
          _ds.stats.probes.feilschen();
          _ds.stats.probes.feuer();
          _ds.stats.probes.flirten();
          _ds.stats.probes.gift();
          _ds.stats.probes.inschrift();
          _ds.stats.probes.klettern();
          _ds.stats.probes.kraftakt();
          _ds.stats.probes.krankheit();
          _ds.stats.probes.mechanismus();
          _ds.stats.probes.reiten();
          _ds.stats.probes.schatzen();
          _ds.stats.probes.schleichen();
          _ds.stats.probes.schlosser();
          _ds.stats.probes.schwimmen();
          _ds.stats.probes.springen();
          _ds.stats.probes.spuren();
          _ds.stats.probes.suchen();
          _ds.stats.probes.taschendiebstahl();
          _ds.stats.probes.verbergen();
          _ds.stats.probes.verstandigen();
          _ds.stats.probes.wissen();
        },
        bemerken : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          val = (val < 8) ? 8 : val;
          $("#p_bemerken").html(val);
        },
        darbieten : function() {
          //
        },
        erwachen : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          $("#p_erwachen").html(val);
        },
        fallenentscharfen : function() {
          var val = _ds.input("geist").num() + _ds.input('geschick').num();
          $("#p_fallen").html(val);
        },
        feilschen : function() {
          var val = _ds.input("geist").num()
              + Math.max(_ds.input('verstand').num(), _ds.input('aura').num());
          $("#p_feilschen").html(val);
        },
        feuer : function() {
          var val = _ds.input("geist").num() + _ds.input('geschick').num();
          $("#p_feuer").html(val);
        },
        flirten : function() {
          var val = _ds.input("geist").num() + _ds.input('aura').num();
          $("#p_flirten").html(val);
        },
        gift : function() {
          var val = _ds.input("koerper").num() + _ds.input('haerte').num();
          $("#p_gift").html(val);
        },
        inschrift : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          $("#p_inschrift").html(val);
        },
        klettern : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('staerke').num();
          $("#p_klettern").html(val);
        },
        kraftakt : function() {
          var val = _ds.input("koerper").num() + _ds.input('staerke').num();
          $("#p_kraftakt").html(val);
        },
        krankheit : function() {
          var val = _ds.input("koerper").num() + _ds.input('haerte').num();
          $("#p_krankheit").html(val);
        },
        mechanismus : function() {
          var val = _ds.input("geist").num()
              + Math
                  .max(_ds.input('geschick').num(), _ds.input('verstand').num());
          $("#p_mechanismus").html(val);
        },
        reiten : function() {
          var val = _ds.input("agilitaet").num()
              + Math.max(_ds.input('bewegung').num(), _ds.input('aura').num());
          $("#p_reiten").html(val);
        },
        schatzen : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          $("#p_schatzen").html(val);
        },
        schleichen : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
          $("#p_schleichen").html(val);
        },
        schlosser : function() {
          var val = _ds.input("geist").num() + _ds.input('geschick').num();
          $("#p_schlosser").html(val);
        },
        schwimmen : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
          $("#p_schwimmen").html(val);
        },
        springen : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
          $("#p_springen").html(val);
        },
        spuren : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          $("#p_spuren").html(val);
        },
        suchen : function() {
          var val = Math.max(_ds.input("geist").num()
              + _ds.input('verstand').num(), 8);
          $("#p_suchen").html(val);
        },
        taschendiebstahl : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('geschick').num();
          $("#p_taschendiebstahl").html(val);
        },
        verbergen : function() {
          var val = _ds.input("agilitaet").num() + _ds.input('bewegung').num();
          $("#p_verbergen").html(val);
        },
        verstandigen : function() {
          var val = _ds.input("geist").num() + _ds.input('geschick').num();
          $("#p_verstandigen").html(val);
        },
        wissen : function() {
          var val = _ds.input("geist").num() + _ds.input('verstand').num();
          $("#p_wissen").html(val);
        }
      },
      stufe : function() {
        var stufe = 0;
        var val = _ds.input("exp").num();
        var exp = 0;
        var step = 100;
        // Für die ersten 10 Level normal gemeinsam
        for (var i = 1; i <= 10; i++) {
          exp += step;
          step += 100;
          if (val < exp) {
            stufe = i;
            break;
          }
        }
        if (stufe == 0) {
          var ishero = _ds.input("heldenklasse").text().length > 1;
          exp = 4500;
          step = ishero ? 1500 : 1000;
          for (var i = 10; i <= 20; i++) {
            exp += step;
            step += (i<15 ? 100 : 200);
            if (val < exp) {
              stufe = i;
              break;
            }
          }
        }
        
        _ds.input("stufe").set(stufe);
      },
      init : function(nodefault) {
        if (!nodefault) {
          _ds.data.defaults(_ds.character);
        }
        _ds.stats.stufe();
        _ds.stats.tables(".inventory", true, false);
        _ds.stats.lebenskraft();
        _ds.stats.abwehr();
        _ds.stats.initiative();
        _ds.stats.laufen();
        _ds.stats.schlagen();
        _ds.stats.schiessen();
        _ds.stats.zaubern();
        _ds.stats.zielzauber();
        _ds.stats.mana();
        _ds.stats.tables(".inventory", false, false);
        _ds.stats.probes.init();
        _ds.stats.tables(".inventory", false, true);
      }
    }
}