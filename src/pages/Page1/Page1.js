import React, {Component} from 'react';
import styles from './Page2.less';
// import styles from './Page1.css';
// import './Page2.less';
// console.log(styles);

export default class Page1 extends Component {
    render() {
        return (
            <div className={styles['A']}>
                <div className="page-box">
                    this is Page1~
                </div>
                <img src={`/images/01.jpg`} />
            </div>
        )
    }
}