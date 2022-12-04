import { Request, Response } from 'express'
import { InvalidParamError } from '../errors'

import { badRequest } from '../helpers/http-helper'

import Form from '../schemas/Form'

class FormController {
  public async index (req: Request, res: Response): Promise<Response> {
    const forms = await Form.find()

    return res.json(forms)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.json(badRequest(new InvalidParamError('Body não pode estar vazio')))
    }

    try {
      const form = await Form.create(req.body)

      return res.json(form)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async show (req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    try {
      let form
      if (!(form = await Form.findById(req.params.id))) {
        return res.json(badRequest(new InvalidParamError('Form não encontrado')))
      }

      return res.json(form)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    if (!req.body) {
      return res.json(badRequest(new InvalidParamError('Body não pode estar vazio')))
    }

    try {
      let form
      if (!(form = await Form.findById(req.params.id))) {
        return res.json(badRequest(new InvalidParamError('Form não encontrado')))
      }

      form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true })

      return res.json(form)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async destroy (req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    try {
      let form
      if (!(form = await Form.findById(req.params.id))) {
        return res.json(badRequest(new InvalidParamError('Form não encontrado')))
      }

      await Form.findByIdAndDelete(req.params.id)

      return res.send()
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }
}

export default new FormController()
