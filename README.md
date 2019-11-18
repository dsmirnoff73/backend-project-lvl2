# HAXLET 
# Backend JavaScript(Node.js) Developer: 2nd project

[![Build Status](https://travis-ci.org/dsmirnoff73/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/dsmirnoff73/backend-project-lvl2)
[![Maintainability](https://api.codeclimate.com/v1/badges/4a9da8b303a9cd2c348e/maintainability)](https://codeclimate.com/github/dsmirnoff73/backend-project-lvl2/maintainability)
***
The task is to develop `сli` app that evaluates two configuration files and build a diffrence report.

Supported config's formats:
* [**JSON**](https://en.wikipedia.org/wiki/JSON)
* [**YAML**](https://en.wikipedia.org/wiki/YAML)
* [**INI**](https://en.wikipedia.org/wiki/INI_file)

Supported output formats:
* **Pretty**:  tree-like easy-to-read structure
* **Plain** :  plain-text difference log
* **Json**  :  stringified json object

***

### Help:
```sh
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (pretty|plain|json) (default: "pretty")
  -h, --help           output usage information
```


### Examples:

*file1:*
```js
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345
  }
}
```

*file2:*
```js
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": 100500
  }
}
```
Result for *--format=pretty*:
```sh
$  gendiff -f pretty file1 file2
```
```sh
{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```

Result for *--format=plain*:
```sh
$  gendiff -f plain file1 file2
```
```sh
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
***

[![asciicast](https://asciinema.org/a/VqKOyc9SysfeboKBnqWp20XxE.svg)](https://asciinema.org/a/VqKOyc9SysfeboKBnqWp20XxE)
[![asciicast](https://asciinema.org/a/BQrLxtkkz3KahbHzlJt4Qr68Y.svg)](https://asciinema.org/a/BQrLxtkkz3KahbHzlJt4Qr68Y)
