# lovelab-batch

A batch server of [Lovelab](https://github.com/enpit2su-ics/2019-team-C/).

Generate tasks from task generators.

## What is Lovelab?

Lovelab is a to-do list application on iPhone.
You can share a to-do list with a team or community like a laboratory.
Lovelab is suitable for laboratories.

## Requirement

Need [docker-compose](https://docs.docker.com/compose/install/) (version 1.24.1)

## Usage

```sh
$ git clone https://github.com/basd4g/lovelab-batch.git
$ cd lovelab-batch
$ cp .env.example .env
$ docker-compose up

# Open https://localhost/api/v1 on browser.
# docker-compose contains [lovelab-api](https://github.com/basd4g/lovelab-api)
```

## License

MIT

## Author

[basd4g](https://github.com/basd4g)

## Reference

- [lovelab-swift (iPhone app of lovelab)](https://github.com/enpit2su-ics/2019-team-C/)
- [lovelab-api (API server of lovelab)](https://github.com/basd4g/lovelab-api)
  
