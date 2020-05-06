import React from 'react';
import { Form, Input, Select, Radio, Checkbox, Upload } from 'antd';
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  EditOutlined
} from '@ant-design/icons';

import styles from '../index.less';

const { Option } = Select;
const { TextArea } = Input;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  marginLeft: 0
};

const BaseFormEl = (props) => {
  const {isEdit, onEdit, onDel, onAdd} = props
  const handleEdit = (v) => {
    onEdit && onEdit(v)
  }
  return <div className={styles.formControl} style={{border: `1px solid ${isEdit ? 'red' : 'transparent'}`}}>
    <div className={styles.formItem}>{ props.children }</div>
    <div className={styles.actionBar}>
      <span className={styles.actionItem} onClick={onDel}><MinusCircleOutlined /></span>
      <span className={styles.actionItem} onClick={onAdd}><PlusCircleOutlined /></span>
      <span className={styles.actionItem} onClick={handleEdit}><EditOutlined /></span>
    </div>
  </div>
}

const formMap = {
  title: {
    component: (props) => {
      const { onDel, onAdd, onEdit, type, index, curIndex, label } = props
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, label})}
        isEdit={curIndex === index}
      >
        <div className={styles.formTit}>{ label }</div>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '表单标题',
        key: 'value'
      }
    ]
  },
  text: {
    component: (props) => {
      const { onDel, onAdd, onEdit, value, index, curIndex, type, onChange, label, placeholder, required, message } = props
      const handleChange = (e) => {
        onChange && onChange(e.target.value)
      }
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, placeholder, label, required, value})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <Input placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '提示文本',
        key: 'placeholder'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  },
  textarea: {
    component: (props) => {
      const { onDel, onAdd, onEdit, value, index, curIndex, type, onChange, label, placeholder, required, message } = props
      const handleChange = (e) => {
        onChange && onChange(e.target.value)
      }
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, label, placeholder, required, value})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <TextArea placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '提示文本',
        key: 'placeholder'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  },
  radio: {
    component: (props) => {
      const { onDel, onAdd, onEdit, value, index, curIndex, type, onChange, label, required, message, option } = props
      const handleChange = (e) => {
        onChange && onChange(e.target.value)
      }
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, label, option, required})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <Radio.Group onChange={handleChange} value={value}>
            {
              option && option.map((item, i) => {
                return <Radio style={radioStyle} value={item.value} key={item.label}>
                  { item.label }
                </Radio>
              })
            }
          </Radio.Group>
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '选项',
        key: 'option'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  },
  checkbox: {
    component: (props) => {
      const { onDel, onAdd, onEdit, index, curIndex, type, label, required, message, option } = props
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, label, option, required})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <Checkbox.Group>
            {
              option && option.map(item => {
                return <Checkbox value={item.value} style={radioStyle} key={item.label}>
                { item.label }
              </Checkbox>
              })
            }
          </Checkbox.Group>
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '选项',
        key: 'option'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  },
  select: {
    component: (props) => {
      const { onDel, onAdd, onEdit, curIndex, index, type, label, placeholder, required, message, option } = props
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, placeholder, label, option, required})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <Select placeholder={placeholder}>
            {
              option && option.map(item => {
                return <Option value={item.value} key={item.label}>{item.label}</Option>
              })
            }
          </Select>
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '选项',
        key: 'option'
      },
      {
        title: '提示文本',
        key: 'placeholder'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  },
  upload: {
    component: (props) => {
      const { onDel, onAdd, onEdit, value, index, curIndex, type, label, required, message } = props
      
      return <BaseFormEl 
        onDel={onDel.bind(this, index)}
        onAdd={onAdd.bind(this, index)}
        onEdit={onEdit.bind(this, {index, type, label, value, required})}
        isEdit={curIndex === index}
      >
        <Form.Item name={label} label={label} rules={[{ message, required }]}>
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
           <div style={{fontSize: '30px'}}>+</div>
          </Upload>
        </Form.Item>
      </BaseFormEl>
    },
    editAttrs: [
      {
        title: '字段名称',
        key: 'label'
      },
      {
        title: '是否必填',
        key: 'required'
      },
    ]
  }
}

export default (props) => {
  const { 
    formData, 
    handleDelete, 
    handleAdd, 
    handleEdit, 
    curEditRowIdx 
  } = props
  return <Form name="customForm">
            {
              formData && formData.map(item => {
                let CP = formMap[item.type].component
                return <CP {...item} key={item.index}
                  onDel={handleDelete} 
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  curIndex={curEditRowIdx}
                />
              })
            }
          </Form>
}
