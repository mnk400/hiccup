import React, { useState, useMemo, useCallback, FC } from 'react'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import { Input } from 'components/common/Input'
import {
  FeaturedEntity,
  LinksEntity,
  CategoriesEntity,
  NewEntity,
} from 'modules/config/types'
import Select, { SelectOption } from 'components/common/Select/Select'

export type Entities =
  | FeaturedEntity
  | LinksEntity
  | Omit<CategoriesEntity, 'links'>
  | NewEntity

export type EditModalField = {
  type: 'input' | 'select' | 'textarea'
  label: string
  value: string | undefined
  options?: SelectOption[]
}

export const EditLinkModal: FC<{
  fields: EditModalField[]
  onCancel: Function
  onSave: Function
  title?: string
}> = ({ fields, onCancel, onSave, title = 'Edit Link' }) => {
  const [data, setData] = useState<EditModalField[]>(fields)
  const handleSave = useCallback(() => onSave(data), [data, onSave])
  const inputs = useMemo(() => {
    return data.map(({ label, type, options, value }, index) => {
      if (type === 'select') {
        return (
          <Select
            label={label}
            name={label}
            key={index}
            values={options}
            value={value}
            onChange={(e) => {
              const value = e.target.value
              setData((oldData) => {
                const newData = JSON.parse(JSON.stringify(oldData))
                newData[index].value = value
                return newData
              })
            }}
            autoFocus={index === 0}
          />
        )
      }

      if (type === 'textarea') {
        return (
          <div key={index} style={{ marginBottom: '16px' }}>
            <label htmlFor={label} style={{ display: 'block', marginBottom: '8px' }}>
              {label}
            </label>
            <textarea
              id={label}
              name={label}
              value={value || ''}
              onChange={(e) => {
                const value = e.target.value
                setData((oldData) => {
                  const newData = JSON.parse(JSON.stringify(oldData))
                  newData[index].value = value
                  return newData
                })
              }}
              style={{ 
                width: '100%', 
                minHeight: '100px', 
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              placeholder={`Enter ${label.toLowerCase()} in markdown format`}
            />
          </div>
        )
      }

      return (
        <Input
          key={index}
          label={label}
          name={label}
          value={value as string}
          onChange={(e) => {
            const value = e.target.value
            setData((oldData) => {
              const newData = JSON.parse(JSON.stringify(oldData))
              newData[index].value = value
              return newData
            })
          }}
          autoFocus={index === 0}
        />
      )
    })
  }, [data])

  return (
    <Modal show={true} onClose={onCancel}>
      <h1 data-testid="edit-link-title" className={modalStyles.title}>
        {title}
      </h1>
      {inputs}
      <button onClick={handleSave} className={modalStyles.button}>
        Save
      </button>
    </Modal>
  )
}
