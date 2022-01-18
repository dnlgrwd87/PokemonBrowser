export default {
    methods: {
        routeTo(routeObject) {
            const name =
                routeObject.type === 'pokemon'
                    ? 'pokemon'
                    : `pokemon-${routeObject.type}`;

            const paramName = `${routeObject.type}_name`;

            this.$router.push({
                name,
                params: { [paramName]: routeObject.name },
            });
        },
    },
};
