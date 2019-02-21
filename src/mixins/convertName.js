export default {
  methods: {
    convertName(name, bannerName) {
      if (name == "farfetchd") return "Farfetch'd";
      let newName = name.replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, " ");
      if (bannerName && newName.indexOf(" ") >= 0) {
        if (newName.indexOf("Tapu") < 0 && newName.indexOf("o-o") < 0) {
          newName = newName.substring(0, newName.indexOf(" "));
        }
      }
      if (newName == "Nidoran M") newName = "Nidoran♂";
      if (newName == "Nidoran F") newName = "Nidoran♀";
      return newName;
    }
  }
};
