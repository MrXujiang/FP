import React from 'react';
import { Input, Select, Radio, Checkbox, Row, Col, Upload } from 'antd';

import { uuid } from '../../utils';

import styles from '../index.less';

const { Option } = Select;
const { TextArea } = Input;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const tplMap = {
  text: {
    component: (props) => {
      const { placeholder, label } = props
      return <div className={styles.fieldOption}><span className={styles.fieldLabel}>{label}:</span><Input placeholder={placeholder} /></div>
    }
  },
  textarea: {
    component: (props) => {
      const { placeholder, label } = props
      return <div className={styles.fieldOption}><span className={styles.fieldLabel}>{label}:</span><TextArea placeholder={placeholder} /></div>
    }
  },
  radio: {
    component: (props) => {
      const { option, label } = props
      return <div className={styles.fieldOption}>
              <span className={styles.fieldLabel}>{label}:</span>
              <Radio.Group>
                {
                  option && option.map((item, i) => {
                    return <Radio style={radioStyle} value={item.value} key={item.label}>
                      { item.label }
                    </Radio>
                  })
                }
            </Radio.Group>
        </div>
    }
  },
  checkbox: {
    component: (props) => {
      const { option, label } = props
      return <div className={styles.fieldOption}>
              <span className={styles.fieldLabel}>{label}:</span>
              <Checkbox.Group>
                <Row>
                  {
                    option && option.map(item => {
                      return <Col span={16} key={item.label}>
                              <Checkbox value={item.value} style={{ lineHeight: '32px' }}>
                                { item.label }
                              </Checkbox>
                            </Col>
                    })
                  }
                </Row>
            </Checkbox.Group>
        </div>
    }
  },
  select: {
    component: (props) => {
      const { placeholder, option, label } = props
      return <div className={styles.fieldOption}>
              <span className={styles.fieldLabel}>{label}:</span>
              <Select placeholder={placeholder} style={{width: '100%'}}>
                {
                  option && option.map(item => {
                    return <Option value={item.value} key={item.label}>{item.label}</Option>
                  })
                }
            </Select>
        </div>
    }
  },
  upload: {
    component: (props) => {
      return <div className={styles.fieldOption}>
              <span className={styles.fieldLabel}>{props.label}:</span>
              <Upload
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <div>+</div>
            </Upload>
        </div>
    }
  }
}

const tpl = [
  {
    label: '文本框',
    placeholder: '请输入内容',
    type: 'text',
    value: '',
    index: uuid(5)
  },
  {
    label: '单选框',
    type: 'radio',
    option: [{label: '男', value: 0}, {label: '女', value: 1}],
    index: uuid(5)
  },
  {
    label: '复选框',
    type: 'checkbox',
    option: [{label: '男', value: 0}, {label: '女', value: 1}],
    index: uuid(5)
  },
  {
    label: '多行文本',
    placeholder: '请输入内容',
    type: 'textarea',
    index: uuid(5)
  },
  {
    label: '选择框',
    placeholder: '请选择',
    type: 'select',
    option: [{label: '中国', value: 0}, {label: '俄罗斯', value: 1}],
    index: uuid(5)
  },
  {
    label: '文件上传',
    type: 'upload',
    index: uuid(5)
  }
]

export {
  tpl,
  tplMap
}

