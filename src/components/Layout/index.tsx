import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import './index.less';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
// import { render } from 'react-dom';

const { Header, Sider, Content } = Layout;
// interface IProps {
//     Header:
// }

const LayoutMain: FC = () => {
    const [collspsed, setCollspsed] = useState(false);

    const toggle = () => {
        setCollspsed(!collspsed);
    };
    return (
        <Layout className={classNames('layout')}>
            <Sider trigger={null} collapsible collapsed={collspsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collspsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutMain;
