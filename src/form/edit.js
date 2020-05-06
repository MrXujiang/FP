import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SelectOutlined
} from '@ant-design/icons';
import { req, uuid, previewURL } from '../utils';
import classnames from 'classnames';
import { tpl, tplMap } from './tool/tpl';
import BaseForm from './tool/baseForm';
import { history } from 'umi';
import styles from './edit.less';

const data = [
  {
    type: 'title',
    label: '单身问卷调查',
    index: uuid(5)
  },
  {
    label: '姓名',
    placeholder: '请输入姓名',
    type: 'text',
    value: '姓名王',
    index: uuid(5)
  },
  {
    label: '性别',
    placeholder: '请输入性别',
    type: 'radio',
    value: '男',
    option: [{label: '男', value: 0}, {label: '女', value: 1}],
    index: uuid(5)
  }
]

// 编辑区表单
const editLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

// 可动态编辑的多选框组件
const MutiFormBox = (props) => {
  const { option, value, onChange } = props;
  const [opts, setOpts] = useState(option || []);
  const tpl = [...value];
  const addRow = () => {
    let base = {label: '', value: ''}
    setOpts(prev => [...prev, base])
    onChange([...tpl, base])
  }
  const delRow = (index) => {
    opts.splice(index, 1)
    setOpts([...opts])
  }
  const handleChange = (index, e) => {
    // console.log(index, e.target.value)
    tpl[index].label = tpl[index].value = e.target.value
    onChange(tpl)
  }
  return <div className={styles.mutiRow}>
    {
      opts.map((item, i) => {
        return <div key={i} className={styles.mutiItem}>
                <span className={styles.label}>{`选项${i}：`}</span>
                <div className={styles.formItem}><Input defaultValue={value[i] ? value[i].label : ''} onChange={handleChange.bind(this, i)} /><MinusCircleOutlined onClick={delRow.bind(this, i)} /></div>
               </div>
      })
    }
    <Button type="primary" onClick={addRow} block>
      <PlusOutlined />
    </Button>
  </div>
}

export default (props) => {
  const [formData, setFormData] = useState(data)
  const [fid, setFid] = useState('')
  const [curEditRow, setCurEditRow] = useState([])
  const [ischoseForm, setChoseForm] = useState(false)
  const [curEditRowIdx, setCurEditRowIdx] = useState('')
  const [editForm] = Form.useForm()
  let addType = useRef('')
  const handleDelete = (v) => {
    let newData = formData.filter(item => item.index !== v)
    setFormData(newData)
  }
  const handleAdd = (v) => {
    document.getElementById('formPanel').scrollTo(0, 200)
    setCurEditRowIdx(v)
    setChoseForm(true)
    setTimeout(() => {
      setChoseForm(false)
    }, 3000)
  }
  const handleEdit = (v) => {
    document.getElementById('formPanel').scrollTo(0, 0)
    setCurEditRow([])
    setCurEditRowIdx(v.index)
    const {placeholder, label, option, type, required} = v;
    editForm.setFieldsValue({placeholder, label, option, type, required})
    let editArrs = [];
    editArrs.push({title: '类型', key: 'type'})
    editArrs.push({title: '字段名', key: 'label'})
    type !== 'title' && editArrs.push({title: '是否必填', key: 'required'})
    placeholder && editArrs.push({title: '提示文本', key: 'placeholder'})
    option && editArrs.push({title: '选项', key: 'option', option})
    setCurEditRow(editArrs)
  }
  const onFieldChange = (e) => {
    addType.current = e.target.value
  }
  const onFormAdd = () => {
    let addItem = tpl.find(item => item.type === addType.current)
    addItem.index = uuid(5)
    if(curEditRowIdx) {
      let curIndex = formData.findIndex(item => item.index === curEditRowIdx)
      formData.splice(curIndex+1, 0, addItem)
      setFormData([...formData])
    }else {
      setFormData(prev => [...prev, {...addItem}])
    }
  }

  const onEditFinish = values => {
    console.log(values)
    let newData = formData.map(item => {
      if(item.index === curEditRowIdx) {
        return Object.assign({...item}, values)
      }
      return item
    })
    setFormData(newData)
    setCurEditRow([])
    setCurEditRowIdx('')
  };

  const handleSave = () => {
    const { id, draft } = props.location.query;
    if(id) {
      req.put('/form/tpl/mod', {fid: id, tpl: formData, draft}).then(res => {
        setCurEditRowIdx('')
        setFid(res.fid)
      })
    }else {
      req.post('/form/tpl/save', formData).then(res => {
        setCurEditRowIdx('')
        setFid(res.fid)
      })
    }
  }

  const handleSaveDraft = () => {
    const { id } = props.location.query;
    req.post('/form/draft/save', {id, tpl: formData}).then(res => {
      setCurEditRowIdx('')
    })
  }

  useEffect(() => {
    const { id, draft } = props.location.query;
    if(draft) {
      req.get(`/form/draft/get?id=${id}`).then(res => {
        if(res && res.tpl) {
          setFormData(res.tpl)
        }
      })
    }else {
      id && req.get(`/form/tpl/get?id=${id}`).then(res => {
        if(res && res.tpl) {
          setFormData(res.tpl)
        }
      })
    }
    
  }, [])

  return (
    <div className={styles.editWrap}>
      <div className={styles.tit}>在线表单制作平台</div>
      <div className={styles.content}>
        <div className={styles.formWrap}>
          <BaseForm 
            formData={formData}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            curEditRowIdx={curEditRowIdx}
          />
          <div className={styles.formAction}>
            <div className={styles.formBtn}><Button type="primary" onClick={handleSave}>保存</Button></div>
            <div className={styles.formBtn}><Button type="primary" ghost onClick={handleSaveDraft}>存草稿</Button></div>
            <div className={styles.formBtn}><Button onClick={() => history.push('/formmark')}>返回</Button></div>
          </div>
          {
            !!fid && <div className={styles.visitLink}>表单访问链接：<a href={`${previewURL}/love/form?id=${fid}`} target="_blank"><SelectOutlined />&nbsp;点击此处立即访问</a></div>
          }
        </div>
        <div className={styles.formPanel} id="formPanel">
          <div className={styles.attrSetting}>
            <div className={styles.subTitle}>属性设置</div>
            {
              curEditRow && curEditRow.length ?
              <Form {...editLayout} 
                form={editForm} 
                name="edit-form" 
                onFinish={onEditFinish}>
                {
                  curEditRow.map(item => {
                    return item.key !== 'option' ? 
                              item.key !== 'required' ?
                                <Form.Item name={item.key} label={item.title} key={item.key}>
                                  <Input disabled={item.key === 'type'} />
                                </Form.Item> :
                                  <Form.Item name={item.key} label={item.title} key={item.key}>
                                    <Radio.Group>
                                      <Radio style={{marginBottom: '20px'}} value={1}>是</Radio>
                                      <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                  </Form.Item> :
                                    <Form.Item name={item.key} label={item.title} key={item.key}>
                                      <MutiFormBox option={item.option} />
                                    </Form.Item>
                  })
                }
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form> : null
            }
          </div>
          <div className={classnames(styles.chosenWrap, ischoseForm ? styles.selected : '')}>
            <div className={styles.subTitle}>选择类型</div>
            <div className={styles.chosens}>
              <Radio.Group onChange={onFieldChange}>
                {
                  tpl.map(item => {
                    let CP = tplMap[item.type].component
                    return <Radio style={{marginBottom: '20px'}} value={item.type} key={item.index}>
                    {
                      <CP {...item} key={item.index} />
                    }
                  </Radio>
                  })
                }
              </Radio.Group>
            </div>
            <div className={styles.footer}>
              <Button type="primary" onClick={onFormAdd}>添加</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
