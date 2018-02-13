function DS() {
  var _ds = this;
  this.character = new Character();
  // this.character.init("Olwil", 2, 4,7,8,0,1,0,2,5,6);
  // this.character.print();
  this.pre = [ 'Körper', 'Agilität', 'Geist', 'Stärke', 'Bewegung', 'Verstand',
      'Härte', 'Geschick', 'Aura', 'Panzerung' ];

  this.gold = (new GoldHandler(this)).gold;
  this.data = (new DataHandler(this)).data;
  this.html = (new HtmlHandler(this)).html;  
  this.stats = (new StatsHandler(this).stats)

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

  this.data.load();
  $("#m_chars").trigger("click");
}