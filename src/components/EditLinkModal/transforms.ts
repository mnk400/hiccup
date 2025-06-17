import { EditModalField, Entities } from './EditLinkModal'

export const transformEntityToFields = (link: Entities): EditModalField[] =>
  Object.entries(link).map(([name, value]): EditModalField => {
    // Use textarea for notes field
    if (name === 'notes') {
      return {
        type: 'textarea',
        label: name,
        value: value,
      }
    }
    
    return {
      type: 'input',
      label: name,
      value: value,
    }
  })

export const transformFieldsToEntity = (fields: EditModalField[]): Entities => {
  return fields.reduce((acc, field) => {
    // Clear empty values from the form
    if (field.value === '') return acc

    let fieldValue = field.value

    return {
      ...acc,
      [field.label]: fieldValue,
    }
  }, {}) as Entities
}
