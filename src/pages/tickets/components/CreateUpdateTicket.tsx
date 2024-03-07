import React, { useEffect } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { CreateUpdateTicketProps } from '../ticket.interface'
import { TicketPriority, TicketStatusEnum } from '../ticket.enum'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch } from '../../../hooks/redux'
import { actionCreateTicket, actionUpdateTicket } from '../reducers/ticket.slice'

const CreateUpdateTicket = (props: CreateUpdateTicketProps) => {
  const { open, title, onClose, ticketData } = props
  const dispatch = useAppDispatch()
  const [form] = useForm()
  useEffect(() => {
    if (ticketData) {
      form.setFieldValue('title', ticketData.title)
      form.setFieldValue('description', ticketData.description)
      form.setFieldValue('priority', ticketData.priority)
      form.setFieldValue('status', ticketData.status)
    }
  }, [])
  const getTicketPriorities = () => {
    return [...Object.values(TicketPriority)].map((item) => ({
      value: item,
      label: item,
    }))
  }

  const onOk = () => {
    form.submit()
  }

  const onFinish = (values: {
    title: string
    description: string
    priority: string
  }) => {
    if (ticketData) {
      dispatch(actionUpdateTicket({
        id: ticketData.id,
        ...form.getFieldsValue()
      }))
    } else {
      dispatch(actionCreateTicket({ ...values }))
    }
    onClose()
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      okText="Confirm"
      onOk={onOk}
      cancelText="Cancel"
    >
      <div className="form-create-update-ticket">
        <Form name="basic" onFinish={onFinish} form={form} autoComplete="off">
          <label>Title</label>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please input ticket title!' }]}
          >
            <Input />
          </Form.Item>

          <label>Description</label>
          <Form.Item name="description">
            <Input.TextArea />
          </Form.Item>

          {ticketData ? (
            <>
              <label>Status</label>
              <Form.Item name="status">
                <Select 
                  options={[...Object.values(TicketStatusEnum)].map(item => ({ value: item, label: item.replace('_', ' ') }))}
                />
              </Form.Item>
            </>
          ) : (
            ''
          )}

          <label>Priority</label>
          <Form.Item name="priority">
            <Select options={getTicketPriorities()}></Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default CreateUpdateTicket
