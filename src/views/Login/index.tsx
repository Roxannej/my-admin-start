/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiUserLogin } from '../../api/login';
import { UserState, setUserInfo } from '../../store/module/user';

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 38 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
interface LoginProps extends RouteComponentProps {
    setUserInfo: (userInfo: UserState) => void;
}
// interface FormProp {
//     account?: string;
//     password?: string;
// }
const Login: React.FC<LoginProps> = (props: LoginProps) => {
    // 跳转到首页的路由的操作

    const next = () => {
        const params = new URLSearchParams(window.location.search);
        console.log('params', params);

        const redirectURL = params.get('redirectURL');
        console.log('redirectURL', redirectURL);

        if (redirectURL) {
            window.location.href = redirectURL;
            return;
        }
        props.history.push('/main');
    };
    const onFinish = (values: any) => {
        // const values = res as FormProp;
        apiUserLogin({ account: values.account, password: values.password })
            .then(({ data }: { data: UserState }) => {
                console.log('123', data);
                console.log('1245', values);
                props.setUserInfo(data);
                return next();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h3>react - admin -mini</h3>

            <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(() => ({}), {
    setUserInfo,
})(Login);
