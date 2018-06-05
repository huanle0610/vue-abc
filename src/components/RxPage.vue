<template>
  <div>
    <ul>
      <li
        v-for="(person,index) in people$"
        :key="index"> {{ person }}
      </li>
    </ul>
    <div>
      <div>{{ count }}</div>

      <!-- simple usage -->
      <button v-stream:click="plus$">Add on Click</button>

      <button v-stream:click="{ subject: plus$, data: minusDelta1, options:{once:true} }">
        Add on Click (Option once:true)
      </button>

      <!-- you can also stream to the same subject with different events/data -->
      <button
        v-stream:click="{ subject: minus$, data: minusDelta1 }"
        v-stream:mousemove="{ subject: minus$, data: minusDelta2 }">
        Minus on Click &amp; Mousemove
      </button>

      <pre>{{ $data }}</pre>

      <my-button v-stream:click="plus$"/>
    </div>
  </div>
</template>

<script>
import { merge, of } from 'rxjs';
import { map, pluck, startWith, scan } from 'rxjs/operators';

export default {
  name: 'RxPage',
  components: {
    myButton: {
      template: '<button @click="$emit(\'click\')">MyButton</button>',
    },
  },
  data() {
    return {
      minusDelta1: -10,
      minusDelta2: -10,
      msg: 'Welcome to Your Vue.js App',
    };
  },
  // declare dom stream Subjects
  domStreams: ['plus$', 'minus$'],
  subscriptions() {
    const people$ = of(['Paul', 'Katie', 'Bob']);
    return {
      people$,
      count: merge(
        this.plus$.pipe(map(() => 1)),
        this.minus$.pipe(pluck('data')),
      ).pipe(
        startWith(0),
        scan((total, change) => total + change),
      ),
    };
  },
};
</script>
