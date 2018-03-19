import React, { Component } from 'react';
import {  
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio,
} from "antd-mobile";
import { connect } from 'react-redux';
import { register } from '../actions/user'


@connect(null, { register })

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      type: 'deliver',
      user: '',
      pwd: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.radioData = [
      { type: "deliver", text: "送货员" },
      { type: "customer", text: "顾客" }
    ]
  }

  handleTextChange(k, v) {
    this.setState({
      [k]: v
    });
  }

  handleRegister() {
    this.props.register(this.state)
  }

  render() {
    const { type } = this.state
    return (
      <div>
        <WingBlank style={{marginTop: 30}}>
          <List>
            <InputItem onChange={v => this.handleTextChange('user', v)}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.handleTextChange('pwd', v)}>密码：</InputItem>
            <WhiteSpace />
            <p>请选择您要注册的类型：</p>
            {this.radioData.map(i => (
              <Radio.RadioItem
                key={i.type}
                checked={type === i.type}
                onChange={() => this.handleTextChange('type', i.type)}
              >
                {i.text}
              </Radio.RadioItem>
            ))}
            <WhiteSpace />
            <Button type='primary' onClick={this.handleRegister}>
              注册
            </Button> 
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register;