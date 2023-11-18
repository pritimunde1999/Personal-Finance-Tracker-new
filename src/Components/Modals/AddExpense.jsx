import React from 'react'
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd'

const AddExpense = ({ isExpenseModalVisible, setIsExpenseModalVisible , onFinish}) => {
    const [form] = Form.useForm();

    return (
        <Modal className='modal' title="Add Expense" visible={isExpenseModalVisible} onCancel={() => setIsExpenseModalVisible(false)} footer={null}>
            <Form
                layout='vertical'
                form={form}
                onFinish={(values) => {
                    onFinish(values, "expense")
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name='name'
                    rules={[{ required: true, message: "Please enter a name of the transaction!" }]}
                >
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name='amount'
                    rules={[{ required: true, message: "Please enter an Amount!" }]}
                >
                    <Input type="number" />
                </Form.Item>



                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Date'
                    name='date'
                    rules={[{ required: true, message: "Please enter an Amount!" }]}
                >
                    <DatePicker format='YYYY-DD-MM' />
                </Form.Item>


                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Tag'
                    name='tag'
                    rules={[{ required: true, message: "Please select a Tag!" }]}
                >

                    <Select>
                        <Select.Option value='office'>Office</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='other'>Other</Select.Option>
                    </Select>


                </Form.Item>

                <Form.Item>
                    <Button style={{ width: '100%' }} type='primary' htmlType='submit'>Add Expense</Button>
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default AddExpense