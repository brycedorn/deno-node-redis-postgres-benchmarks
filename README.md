# Deno vs Node Redis/Postgres benchmarking

As part of a dev.to [article](https://dev.to/bryce/why-deno-is-bad-for-caching-2l24-temp-slug-2805363).

## Results

Results from running on Apple M1 Max 64GB Ventura 13.1:

| Uses node? | benchmark | time (avg) | (min … max) | p75 | p99 | p995 |
| --- | --- | --- | --- | --- | --- | --- |
| ❌ | Deno -> Redis | 257.12 ms/iter | (1 µs … 380.55 ms) | 335.71 ms | 380.55 ms | 380.55 ms |
| ❌ | Deno -> Postgres | 42.98 ms/iter | (916 ns … 89.29 ms) | 79.8 ms | 89.29 ms | 89.29 ms |
| ✅ | Deno -> Node -> Redis | 64.34 ms/iter | (958 ns … 112.19 ms) | 107.1 ms | 112.19 ms | 112.19 ms |
| ✅ | Deno -> Node -> Postgres | 119.59 ms/iter | (250 ns … 202.31 ms) | 175.61 ms | 202.31 ms | 202.31 ms |

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

First switch to `node` directory and install dependencies:

```
cd deno
npm i
```

Then start the express server:

```
npm run redis_bench
```

Then in another tab run the benchmark:

```
cd deno
deno task deno-node-redis
```

To run benchmarks for Postgres, follow same steps as above but start express server for Postgres:

```
npm run postgres_bench
```