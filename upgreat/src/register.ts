import { FastifyInstance, FastifyRequest } from "fastify"
import fastifyFormbody from '@fastify/formbody'
import qs from 'qs'
import localize from 'ajv-i18n'

class FormError {
    error: any ={}

    constructor(schema_errors: Array<object>) {
        for (const schema_error of schema_errors) {
            if (!('instancePath' in schema_error) || typeof(schema_error.instancePath) !== 'string') {
                this.error.form='Chyba validácie (schema_error.instancePath). Kontaktujte správcu: <a href="mailto:admin@martinjanu.eu">admin@martinjanu.eu</a>'
                continue
            }
            if (!('keyword' in schema_error) || typeof(schema_error.keyword) !== 'string') {
                this.error.form='Chyba validácie (schema_error.keyword). Kontaktujte správcu: <a href="mailto:admin@martinjanu.eu">admin@martinjanu.eu</a>'
                continue
            }
            if (!('params' in schema_error)) {
                this.error.form='Chyba validácie (schema_error.params). Kontaktujte správcu: <a href="mailto:admin@martinjanu.eu">admin@martinjanu.eu</a>'
                continue
            }
            if (!('message' in schema_error) || typeof(schema_error.message) !== 'string') {
                this.error.form='Chyba validácie (schema_error.message). Kontaktujte správcu: <a href="mailto:admin@martinjanu.eu">admin@martinjanu.eu</a>'
                continue
            }

            const instance_path = schema_error.instancePath.replace(/^\//, "").split('/')
            if (instance_path.length <= 0) {
                this.error.form="Chyba validácie: " + schema_error.message
                continue
            }

            let prev = this.error
            for (let i = 0; i < instance_path.length - 1; ++i) {
                prev[instance_path[i]] = {}
                prev = prev[instance_path[i]]
            }
            prev[instance_path[instance_path.length - 1]] = schema_error.message
        }
    }
}

const register_schema = {
    body: {
        type: "object",
        properties: {
            "guardian_name": {
                type: "string",
                minLength: 20,
                maxLength: 100
            },
            "children": {
                type: "array",
                minItems: 1,
                items: {
                    type: "object",
                    properties: {
                        "forename": {
                            type: "string",
                            minLength: 20,
                            maxLength: 100
                        }
                    },
                    required: ["forename"]
                }
            }
        },
        required: ["guardian_name"],
        "additionalProperties": false
    }
}

const routes = async (fastify: FastifyInstance, options: Object) => {

    fastify.register(fastifyFormbody, {parser: qs.parse})

    fastify.get('/register', async (req, reply) => {
        return reply.view('register.njk')
    })

    fastify.post( "/register", {
        attachValidation: true,
        schema: register_schema}, async (req, reply) => {
        console.log(req.body)

        if (req.validationError) {
            (localize as any).sk(req.validationError.validation)
            console.log(req.validationError.validation)
            return reply.view("register.njk", {
                value: req.body, error: new FormError(req.validationError.validation).error})
        }

        reply.code(303) // See Other
            .header('Location', './register-success')
            .send()
    })
}

export default routes;
