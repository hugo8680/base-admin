import React  from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getAccounts, selectRoleTags } from "@/services/account";
import {Input, Button, Modal, Tag, Avatar, Checkbox, Row, Col} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";


class AccountIndex extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      tableName: '账户',
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          hideInForm: true,
          hideInSearch: true
        },
        {
          title: '账户名',
          dataIndex: 'username',
          rules: [
            {
              required: true,
              message: '账户名必填',
            },
            {
              min: 2,
              max: 16,
              message: '账户名应为2~16个字符'
            }
          ],
        },
        {
          title: '密码',
          dataIndex: 'password',
          hideInSearch: true,
          hideInTable: true,
          rules: [
            {
              required: true,
              message: '请填写密码',
            },
            {
              min: 6,
              max: 16,
              message: '密码应为6~16个字符'
            }
          ],
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          rules: [
            {
              min: 2,
              max: 16,
              message: '昵称应为2~16个字符'
            }
          ],
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          hideInSearch: true,
          render: (val, item) => {
            return(
              <img style={{width: 46, height: 46, borderRadius: 6, border: item.gender === 1 ? '1.5px solid #69c0ff' : '1px solid #ffa39e'}} src={val} alt='...' />
            )
          },
          renderFormItem: item => {
            return(
              <Row>
                <Col span={20}>
                  <Input style={{height: 32}} type='file' placeholder='请选择头像' />
                </Col>
                <Col span={4}>
                  <Avatar alt='...' src={this.state.uploadedAvatar} style={{width: 32, height: 32, marginLeft: 10}} />
                </Col>
              </Row>
            )
          },
        },
        {
          title: '手机号',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          valueEnum: {
            1: '男',
            0: '女',
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          valueType: 'dateTime',
          hideInForm: true,
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          valueType: 'dateTime',
          hideInForm: true,
          hideInSearch: true,
          hideInTable: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          valueEnum: {
            1: {
              text: '激活',
              status: 'Success'
            },
            0: {
              text: '冻结',
              status: 'Default'
            },
          }
        },
        {
          title: '角色',
          dataIndex: 'roles',
          hideInForm: true,
          hideInSearch: true,
          render: (val) => {
            return val.map(item => {
              return (
                <Tag style={{display: 'inline-block', margin: 2}} key={item.id} color="cyan">{item.remark}</Tag>
              )
            })
          }
        },
        {
          title: '角色',
          dataIndex: 'roleIds',
          hideInTable: true,
          hideInSearch: true,
          renderFormItem: item => {
            return(
              <Checkbox.Group options={this.state.roleTags} />
            )
          }
        },
      ],
      roleTags: [],
      createAccountVisible: false,
      uploadedAvatar: ''
    };
  }

  componentDidMount() {
    selectRoleTags().then(res => {
      if (res.code === 200) {
        const { data } = res;
        const { columns } = this.state;
        const valueEnum = {};
        data.forEach(item => {
          valueEnum[item.name] = item.remark;
        });
        columns.push({
          title: '角色',
          dataIndex: 'role',
          hideInForm: true,
          hideInTable: true,
          valueEnum
        });
        this.setState({
          columns,
          roleTags: data.map(item => { return { label: item.remark, value: item.id } })
        })
      }
    });
  }

  render() {
    return <PageHeaderWrapper title={false}>
      <ProTable
        headerTitle={this.state.tableName}
        columns={this.state.columns}
        rowKey="id"
        pagination={{ showSizeChanger: true }}
        rowSelection={{}}
        request={params => getAccounts(params)}
        search={{ collapsed: false, collapseRender: () => {} }}
        options={{setting: true, fullScreen: true, reload: true}}
        dateFormatter="string"
        toolBarRender={(action, { selectedRows }) => [
          <Button onClick={() => { this.setState({createAccountVisible: true}) }} type="primary"><PlusOutlined />新建</Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button type='danger'><DeleteOutlined/>删除</Button>
          ),
        ]}
      />
      <Modal title='创建账户' visible={this.state.createAccountVisible} maskClosable onCancel={() => this.setState({createAccountVisible: false})} footer={null}>
        <ProTable type='form' columns={this.state.columns} />
      </Modal>
    </PageHeaderWrapper>;
  }
}

export default AccountIndex;
