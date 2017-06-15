function HtmlHandler(_ds) {
  this.html = {
      weapons : $('#waffen TBODY'),
      defense : $('#defense TBODY'),
      talents : $('#talents TBODY'),
      spells : $('#spells TBODY'),
      inventar : $('#inventar TBODY'),

      html : function() {
        _ds.html.weapons.find("TR").remove();
        _ds.character.weapons.forEach(function(entry) {
          _ds.html.weapons.append("<tr><td><input class='name' type=text value='"
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
        _ds.html.defense.find("TR").remove();
        _ds.character.defense.forEach(function(entry) {
          _ds.html.defense.append("<tr><td><input class='name' type=text value='"
              + entry.name
              + "'></td><td><input class='Eigenschaften' type=text value='"
              + entry.attributes
              + "'></td><td><input class='active' type='checkbox' "
              + (entry.active ? "checked" : "")
              + "/></td><td><div class='del'>X</div></td></tr>");
        });
        _ds.html.talents.find("TR").remove();
        _ds.character.talents.forEach(function(entry) {
          _ds.html.talents.append("<tr><td><input class='name' type=text value='"
              + entry.name
              + "'></td><td><input class='Eigenschaften' type=text value='"
              + entry.attributes
              + "'></td><td><input class='stufe' type=text value='" + entry.rang
              + "'></td><td><input class='active' type='checkbox' "
              + (entry.active ? "checked" : "")
              + "/></td><td><div class='del'>X</div></td></tr>");
        });
        _ds.html.spells.find("TR").remove();
        _ds.character.spells.forEach(function(entry) {
          _ds.html.spells.append("<tr><td><input class='name' type=text value='"
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
        _ds.html.inventar.find("TR").remove();
        _ds.character.inventar.forEach(function(entry) {
          _ds.html.inventar
              .append("<tr><td><input class='name' type=text value='"
                  + entry.name + "'></td><td><input class='Wo' type=text value='"
                  + entry.wo
                  + "'></td><td><input class='Eigenschaften' type=text value='"
                  + entry.attributes
                  + "'></td><td><div class='del'>X</div></td></tr>");
        });
        $("#attribute input").prop("readonly", true)
      },
      events : {
        deleteRow : function() {
          $(".del").unbind("click").click(function(elem) {
            $(this).closest("tr").remove();
          });
        },
        addRow : function() {
          $(".newrow").unbind("click")
              .click(
                  function() {
                    var tablename = $(this).attr('class').split("nr_")[1];
                    id = "#" + tablename;
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
          });
        },
        select : function(id) {
          $("#ds_i_" + id + " input").unbind("change").change(function(val) {
            var max = Math.min(100, _ds.input(id).num());
            var html = "";
            for (var i = max; i > 0; i--) {
              html += "<option value='" + i + "'>" + i + "</option>";
            }
            var old = $("#ds_i_" + id + " select").val();
            $("#ds_i_" + id + " select").html(html);

            $("#ds_i_" + id + " select").val(old);
          });
        },
        input : function() {
          $("#werte INPUT").unbind("keydown").keydown(
              function(e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.which, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
                    ||
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

          $("#werte INPUT").unbind("focusin").focusin(
              function() {
                $(this).addClass("focus");
                $(this).val(
                    _ds.character[$(this).parent().attr("class").split(
                        "inputtofind ")[1]]);
              });
          $("#werte INPUT").unbind("focusout").focusout(
              function() {
                _ds.character[$(this).parent().attr("class")
                    .split("inputtofind ")[1]] = $(this).val();
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
        }
      },
      init : function() {
        _ds.html.html();
        _ds.html.events.deleteRow();
        _ds.html.events.addRow();
        _ds.html.events.menu();
        _ds.html.events.select("lebenskraft");
        _ds.html.events.select("mana");
        _ds.html.events.input();
        _ds.html.events.gold();
        _ds.html.events.file();
      }

    }
}