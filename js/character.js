function Character() {
  this.init = function(_name, _stufe, _kor, _agi, _gei, _st, _ha, _be, _ge,
      _ve, _au) {
    this.name = _name;
    this.stufe = _stufe;
    this.kor = _kor;
    this.agi = _agi;
    this.gei = _gei;
    this.st = _st;
    this.ha = _ha;
    this.be = _be;
    this.ge = _ge;
    this.ve = _ve;
    this.au = _au;
  }

  this.kor = 0;
  this.ha = 0;
  this.pa = 0;
  this.agi = 0;
  this.be = 0;
  this.st = 0;
  this.stufe = 1;
  this.ge = 0;
  this.au = 0;
  this.ve = 0;
  this.gei = 0;
  this.name = "<Name>";
  this.exp = 0;
  this.player = "<Spielername>";
  this.volk = "<Volk>";
  this.lp = 0;
  this.tp = 0;
  this.volksfahigkeiten = "<F\u00e4higkeiten>";
  this.klasse = "<Klasse>";
  this.heldenklasse = "";
  this.gold = 0;
  
  this.geschlecht = "";
  this.geburtsort = "";
  this.geburtstag = "";
  this.alter = 0;
  this.grosse = 0;
  this.haarfarbe = "";
  this.augenfarbe = "";
  this.besonderes = "";
  this.sprachen = "";
  this.schriftzeichen ="";

  this.weapons = [];
  this.defense = [];
  this.talents = [];
  this.spells = [];
  this.inventar = [];
  this.begleiter = [];
  this.diary = [];

  this.print = function() {
    //
  }
}