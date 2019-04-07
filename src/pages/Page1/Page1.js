import React, {Component} from 'react';
import styles from './Page2.less';
// import styles from './Page1.css';
// import './Page2.less';
// console.log(styles);
import Hello from './component/Hello/Hello.js'

export default class Page1 extends Component {
    constructor(props) {
      super(props);

      this.state = {
        info: {
            name: "jack",
            age: 12
        },
        count: 0,
        color: "blue",
      };

      this.back = false;
    }

    handleClick(){
        if(this.state.count == 8){
            this.back = true;
        }else if(this.state.count == 0){
            this.back = false;
        }

        this.setState({
            count: this.back ? this.state.count - 1 : this.state.count + 1,
            color: this.back ? "red" : "blue"
        })
    }

    render() {
        return (
            <div className={styles['A']}>
                <div className="page-box">
                    this is Page1~方正正中黑简~
                    <Hello num={this.state.count}/>
                    <p>{this.state.count} ---- from state</p>
                    <i onClick={this.handleClick.bind(this)} className="iconfont icon-turn-on" style={{color:this.state.color}}></i>
                </div>
                {/*<img src={`/images/01.jpg`} />*/}
            </div>
        )
    }
}