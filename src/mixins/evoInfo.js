import convertName from "@/mixins/convertName";

export default {
  mixins: [convertName],
  methods: {
    getEvoText(evo, mobile) {
      let text = "";

      if (evo.name == "shedinja" && !mobile) {
        text = "Level " + evo.min_level + ",<br />open spot in party,<br />Pokéball in bag";
        return text;
      }

      if (evo.name == "shedinja" && mobile) {
        text = "Lvl " + evo.min_level + ",<br />spot in party,<br />Pokéball in bag";
        return text;
      }

      if (evo.trigger == "level-up") {
        if (evo.held_item) {
          text = "Hold " + this.convertName(evo.held_item);
          if (evo.time_of_day) {
            text += ",<br />" + evo.time_of_day + "time";
          }
          return text;
        }

        if (evo.known_move && !mobile) {
          text = "Level up<br />knowing " + this.convertName(evo.known_move);
          return text;
        }

        if (evo.known_move && mobile) {
          text = "Lvl up<br />knowing<br />" + this.convertName(evo.known_move);
          return text;
        }

        if (evo.min_happiness) {
          text = "Happiness";
          if (evo.time_of_day) {
            text += ",<br />" + evo.time_of_day + "time";
          }
          return text;
        }

        if (evo.location) {
          if (evo.name == "glaceon" || evo.name == "leafeon") {
            text = "Level up<br />near " + this.convertName(evo.location);
            return text;
          } else {
            text = "Level up,<br />" + this.convertName(evo.location) + " area";
            return text;
          }
        }

        if (evo.name == "sylveon") {
          text = "Affection, know<br />Fairy type move";
          return text;
        }

        if (evo.min_level) {
          if (!mobile) {
            text += "Level " + evo.min_level;
          }

          if (mobile) {
            text += "Lvl " + evo.min_level;
          }

          if (evo.version) {
            text += ",<br />" + evo.version;
          }

          if (evo.name == "hitmonlee") {
            text += ",<br />Atk > Def";
          }

          if (evo.name == "hitmonchan") {
            text += ",<br />Atk < Def";
          }

          if (evo.name == "hitmontop") {
            text += ",<br />Atk = Def";
          }

          if (evo.location) {
            text += ",<br />in " + this.convertName(evo.location);
          }

          if (evo.time_of_day) {
            text += ",<br />" + evo.time_of_day + "time";
          }

          if (evo.name == "vespiquen" || evo.name == "salazzle") {
            text += ",<br />Female";
          }
        }
        return text;
      }

      // trade (holding an item)
      if (evo.trigger == "trade") {
        if (evo.held_item && !mobile) {
          text = "Trade,<br />holding " + this.convertName(evo.held_item);
          return text;
        }
        if (evo.held_item && mobile) {
          text = "Trade,<br />w/ " + this.convertName(evo.held_item);
          return text;
        } else {
          text = "Trade";
          return text;
        }
      }

      if (evo.item) {
        text = this.convertName(evo.item);
        if (evo.location) {
          text += ",<br />in " + this.convertName(evo.location);
        }
        if (evo.name == "gallade") {
          text += ",<br />Male";
        }
        if (evo.name == "froslass") {
          text += ",<br />Female";
        }
        return text;
      }
    }
  }
};
