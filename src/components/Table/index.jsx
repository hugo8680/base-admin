import React, {useRef} from "react";
import {Button} from "antd";
import ProTable  from '@ant-design/pro-table';
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";


class ExtendedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = useRef();
  }

  render() {
    return(
      <ProTable
        columns={this.props.columns}
        request={this.props.request}
        rowKey={this.props.rowKey}
        pagination={{ showSizeChanger: true }}
        search={{ collapsed: false }}
        actionRef={this.ref}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary"><PlusOutlined /> 新建</Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button type='danger'><DeleteOutlined/> 删除</Button>
          ),
        ]}
        dateFormatter="string"
        headerTitle={this.props.title}
      />
      )
  }
}

export default ExtendedTable;
