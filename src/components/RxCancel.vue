<template>
  <div>
    use RxJS to cancel axios request
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';
import { Observable, defer, from } from 'rxjs';
import { take, mergeMap, flatMap } from 'rxjs/operators';

export default {
  name: 'RxCancel',
  created() {
    const fromRequest = request =>
      new Observable(
        (o) => {
          const source = axios.CancelToken.source();

          o.add(() => source.cancel('Operation canceled by the user.'));

          axios({ ...request, cancelToken: source.token })
            .then(
              response => o.next(response),
              err => (axios.isCancel(err) ? console.log(err) : o.error(err)),
            );
        },
      );

    const userIDs = ['1', '2', '3'];

    const url = id =>
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

    const result = defer(
      () => from(userIDs).pipe(
        mergeMap(id => fromRequest({ url: url(id) }).pipe(flatMap(res => res.data))),
      ),
    );

    // merge mapping userIDs with fromRequest's above can make up to 3 API requests
    // since we take 5 values, the second and third request are cancelled.
    result.pipe(take(5)).subscribe(
      x => console.log(x),
      err => console.error('error:', err),
      () => console.log('bye'),
    );
  },
};
</script>
