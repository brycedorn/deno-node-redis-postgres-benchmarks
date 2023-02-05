# Deno vs Node Redis/Postgres benchmarking

As part of a dev.to [article](https://dev.to/bryce/why-deno-is-bad-for-caching-2l24-temp-slug-2805363).

## Results

Results from running on Apple M1 Max 64GB Ventura 13.1 from Amsterdam with both hosted services in `eu-west-1`:

| Uses node? | Benchmark | Time (avg) | (min … max) | p75 | p99 |
| --- | --- | --- | --- | --- | --- |
| no | Deno -> Redis | 65.06 ms/iter | (792 ns … 114.68 ms) | 111.41 ms | 114.68 ms |
| no | Deno -> Postgres | **42.98 ms/iter** | (916 ns … 89.29 ms) | 79.8 ms | 89.29 ms |
| yes | Deno -> Node -> Redis | **34.79 ms/iter** | (28.4 ms … 41.7 ms) | 36.53 ms | 41.7 m |
| yes | Deno -> Node -> Postgres | 88.24 ms/iter | (667 ns … 205.44 ms) | 160.8 ms | 205.44 ms |

## Running locally

#### Prerequisites

 - Deno >= v1.30.2.
 - V8 >= v10.9.194.5.
 - TS >= v4.9.4.
 - Node >= v16.15.0.
 - Redis instance, I'm using [Redis Enterprise Cloud](https://redis.com/redis-enterprise-cloud/overview/) (has free tier).
 - Postgres instance, I'm using [supabase](https://supabase.com/) (has free tier).
   - This example uses `hex` as the lookup key but this is simple to replace for your table.

Once you have the above you can then initialize your environment:

```
cp .env.example .env
```

Then set the values to your credentials.

### Deno

First switch to `deno` directory:

```
cd deno
```

To run benchmarks for Redis:

```
deno task deno-redis
```

To run benchmarks for Postgres:

```
deno task deno-postgres
```

### Deno + Node

First switch to `node` directory, install dependencies and start the express server:

```
cd deno
npm i
npm run redis_bench
```

Then in another tab run the benchmark:

```
cd deno
deno task deno-node-redis
```

To run benchmarks for Postgres, follow same steps as above but instead start express server for Postgres:

```
npm run postgres_bench
```