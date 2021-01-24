# autoscroll

A utility for auto-scroll when trigger location of event (i.e. mouse event) almost reach boundary.

[![NPM](https://nodei.co/npm/autoscroll.png?downloads=true&stars=true)](https://www.npmjs.com/package/autoscroll/)

## Installation

1. Install the latest version of [autoscroll](https://github.com/seawind543/autoScroll):

```
  npm install --save autoscroll
  ```

2. At this point you can import `autoscroll`:

```javascript
import autoScroll from 'autoscroll';
```
## Example

```javascript
import React, { PureComponent } from 'react';
import autoScroll from 'autoscroll';

class Example extends PureComponent {
    refContent = (content) => {
        this.content = content;
    }

    actions = {
        onMouseMove: (e) => {
            // Start auto scrolling
            autoScroll.run(e, this.content);
        },
        onMouseOut: (e) => {
            // Stop auto scrolling if any
            autoScroll.end();
        }
    };

    render() {
        return (
            <div
                style={{
                    height: 500,
                    overflow: 'auto'
                }}
                ref={this.refContent}
                onMouseMove={this.actions.onMouseMove}
                onMouseOut={this.actions.onMouseOut}
            >
                <div
                    style={{
                        height: 1000,
                        backgroundColor: 'yellow'
                    }}
                />
            </div>
        );
    }
}

export default Example;

```

## License

[MIT](https://github.com/seawind543/autoScroll/blob/master/LICENSE)