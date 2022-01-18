export default {
    methods: {
        convertName(name, bannerName) {
            if (name === 'farfetchd') return "Farfetch'd";

            let newName = name
                .replace(/\b\w/g, (l) => l.toUpperCase())
                .replace(/-/g, ' ');

            if (bannerName && newName.indexOf(' ') >= 0) {
                if (newName.indexOf('Tapu') < 0 && newName.indexOf('o-o') < 0) {
                    newName = newName.substring(0, newName.indexOf(' '));
                }
            }

            if (newName === 'Nidoran M') newName = 'Nidoran♂';
            if (newName === 'Nidoran F') newName = 'Nidoran♀';

            return newName;
        },
        convertAltDisplayName(name) {
            if (
                name.indexOf('Normal Forme') >= 0 ||
                name.indexOf('Attack Forme') >= 0 ||
                name.indexOf('Speed Forme') >= 0 ||
                name.indexOf('Defense Forme') >= 0
            ) {
                return name.slice(0, name.indexOf(' '));
            } else if (name.indexOf(' Rotom') >= 0) {
                return name.slice(0, name.indexOf(' '));
            } else if (name.indexOf(' Style') >= 0) {
                return name.slice(0, name.indexOf(' '));
            }

            return name;
        },
    },
};
