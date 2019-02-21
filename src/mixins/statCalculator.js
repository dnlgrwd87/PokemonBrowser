export default {
  methods: {
    minHp(hp) {
      return (2 * hp * 100) / 100 + 110;
    },
    maxHp(hp) {
      return ((2 * hp + 31 + 252 / 4) * 100) / 100 + 110;
    },
    minStat(stat) {
      return Math.floor(((2 * stat * 100) / 100 + 5) * 0.9);
    },
    maxStat(stat) {
      return Math.floor((((2 * stat + 31 + 252 / 4) * 100) / 100 + 5) * 1.1);
    }
  }
}