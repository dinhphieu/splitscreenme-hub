import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Form, Icon, Input, Button, notification, Checkbox } from 'antd';
import { withRouter } from 'react-router';
const FormItem = Form.Item;
const { TextArea } = Input;
class ManageHandler extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return notification.error(err);
      Meteor.call(
        'handlers.update',
        {
          _id: this.props.handlerId,
          title: values.title,
          description: values.description,
          private: !values.isPublic,
        },
        (error, result) => {
          if (error) return notification.error(error);
          else
            return notification.success({
              message: 'Handler updated',
              description: 'Your modifications had been saved.',
            });
        },
      );
    });
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      description: this.props.initialDescription,
      title: this.props.initialTitle,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h4>Your handler name</h4>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please enter a valid name for your handler.' }],
          })(<Input type="text" />)}
        </FormItem>
        <h4>Your handler description (Markdown supported)</h4>
        <FormItem>
          {getFieldDecorator('description', {
            rules: [
              { required: true, message: 'Please enter a valid description for your handler.' },
            ],
          })(
            <TextArea
              placeholder="Your handler description..."
              autosize={{ minRows: 5, maxRows: 25 }}
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('isPublic', {
            valuePropName: 'checked',
            initialValue: !this.props.handlerStatus,
          })(
            <Checkbox disabled={!this.props.handlerVersion}>
              {' '}
              I want to publicly share my handler.
            </Checkbox>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(withRouter(ManageHandler));
