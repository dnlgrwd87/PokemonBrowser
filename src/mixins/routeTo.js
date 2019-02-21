export default {
  methods: {
    routeTo(routeObject) {
      let name = "pokemon-" + routeObject.type;
      let paramName = routeObject.type + "_name";
      if (routeObject.type == "pokemon") {
        name = "pokemon";
      }
      this.$router.push({
        name: name,
        params: { [paramName]: routeObject.name }
      });
    }
  }
};
