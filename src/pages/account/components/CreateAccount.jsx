import React from "react";
import {Modal, Input} from "antd";
import { UserOutlined } from "@ant-design/icons";


class CreateAccount extends React.Component {
  constructor(p) {
    super(p);
    this.state = {}
  }

  render() {
    return(
      <Modal
        destroyOnClose
        maskClosable
        title="新建账户"
        visible={this.props.visible}
        onCancel={() => this.props.cancel()}
        footer={null}
      >
        <Input prefix={<UserOutlined />} title='姓名' placeholder='请输入姓名' />
      </Modal>
    )
  }
}


export default CreateAccount;
