import * as Yup from 'yup'

const AddressSchema = Yup.object().shape({
    address: Yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid address')
})

export {
    AddressSchema
}