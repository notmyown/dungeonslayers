function GoldHandler(_ds) {
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
}