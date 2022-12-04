import { Schema, model, Document } from 'mongoose'

interface Form extends Document {
    name: string
    email: {
        type: string
        unique: true
    }
}

const FormSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default model<Form>('Form', FormSchema)
