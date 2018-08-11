<template>
  <div>
    <button @click="deal">Deal</button>
    <label
      v-for="(suit, key) in suits"
      :key="key"
    >
      <input
        v-model="exclude"
        type="checkbox"
        :value="key"
      >
      <img
        :src="`static/suits/${suit}.svg`"
        width="64px"
      >
    </label>

    <span>Total: {{ deck.length }}</span>
    <span>Show: {{ finalDeck.length }}</span>
    <hr>
    <ul class="cards">
      <li
        v-for="(card, index) in finalDeck"
        :key="card"
        class="card"
      >
        <card
          :amtf="1"
          :card="card"
          :show="index%2 === 0"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/Card';

import { getDeck, Suits, Ranks } from '../game';

export default {
  name: 'Poker',
  components: { Card },
  data() {
    return {
      suits: Suits,
      ranks: Ranks,
      exclude: [],
      deck: [],
    };
  },
  computed: {
    finalDeck() {
      const vm = this;
      return vm.deck.filter(d => !vm.exclude.includes(d.substr(-1).toLowerCase()));
    },
  },
  created() {
    this.deal();
  },
  methods: {
    deal() {
      this.deck = getDeck();
    },
  },
}
;
</script>

<style scoped>
    .deck {

    }

    .cards {
        margin: 0 -10px;
        padding: 0;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .cards .card {
        float: left;
        width: calc(33.333333333% - 20px);
        margin: 0 10px 2.5px 10px;
        padding: 10px;
    }

    @supports (display: grid) {
        .cards card {
            width: auto;
        }
    }

</style>
