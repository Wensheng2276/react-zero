import React, {Component} from 'react';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import styles from './index.less';

const ReactGridLayout = WidthProvider(RGL);


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.defaultMsg = {
            isDraggable: true,
            isResizable: true,
            items: 20,
            rowHeight: 30,
            onLayoutChange: function(data) {
                console.log(data);
            },
            cols: 12,
            // compactType: 'horizontal'
        };
    }


    generateDOM() {
      // Generate items with properties from the layout, rather than pass the layout directly
        const layout = this.generateLayout();
        return _.map(_.range(this.defaultMsg.items), function(i) {
            return (
                <div key={i} data-grid={layout[i]}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    }


    generateLayout() {
        const p = this.defaultMsg;
        return _.map(new Array(p.items), function(item, i) {
            var w = _.result(p, "w") || Math.ceil(Math.random() * 4);
            var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: w,
                h: y,
                i: i.toString()
            };
        });
    }

    onLayoutChange(layout) {
        this.defaultMsg.onLayoutChange(layout);
    }


    render() {

        return (
            <div className={styles["index"]}>
                <ReactGridLayout onLayoutChange={this.onLayoutChange} {...this.defaultMsg} margin={[4, 4]}>
                    {this.generateDOM()}
                </ReactGridLayout>
            </div>
        )
    }
}


