import { FastifyInstance, FastifyRequest } from "fastify"
import fastifyFormbody from '@fastify/formbody'
import qs from 'qs'
import localize from 'ajv-i18n'

class FormError {
    error: any = {}
    messages: string[] = []

    constructor(schema_errors: Array<object>) {
        for (const schema_error of schema_errors) {
            if (!('instancePath' in schema_error) || typeof(schema_error.instancePath) !== 'string') {
                this.messages.push('Chyba validácie (schema_error.instancePath).')
                continue
            }
            if (!('message' in schema_error) || typeof(schema_error.message) !== 'string') {
                this.messages.push('Chyba validácie (schema_error.message).')
                continue
            }

            this.messages.push(`${schema_error.instancePath}: ${schema_error.message}`)

            const instance_path = schema_error.instancePath.replace(/^\//, "").split('/')
            if (instance_path.length <= 0) {
                continue
            }

            let prev = this.error
            for (let i = 0; i < instance_path.length - 1; ++i) {
                prev[instance_path[i]] = {}
                prev = prev[instance_path[i]]
            }
            prev[instance_path[instance_path.length - 1]] = schema_error.message
        }
        this.error['messages'] = this.messages
    }
}

const register_schema = {
    body: {
        type: "object",
        properties: {
            "guardian_name": {
                type: "string",
                minLength: 2,
                maxLength: 100
            },
            "guardian_email": {
                type: "string",
                maxLength: 100,
                pattern: "^..*@..*\\...*$"
            },
            "guardian_tel": {
                type: "string",
                pattern: "^\\+?\\d( ?\\d){9,19}$"
            },
            "children": {
                type: "array",
                minItems: 1,
                items: {
                    type: "object",
                    properties: {
                        "forename": {
                            type: "string",
                            minLength: 2,
                            maxLength: 100
                        },
                        "surname": {
                            type: "string",
                            minLength: 2,
                            maxLength: 100
                        },
                        "gender": {
                            enum: ["female", "male"]
                        },
                        "date_of_birth": {
                            type: "string",
                            pattern: "^\\d\\d\\d\\d-\\d\\d-\\d\\d$"
                        },
                        "municipality": {
                            type: "string",
                            minLength: 2,
                            maxLength: 50
                        },
                        "street_with_number": {
                            type: "string",
                            maxLength: 50
                        },
                        "postal_code": {
                            type: "string",
                            pattern: "^\\d( ?\\d){2,9}$"
                        },
                        "days": {
                            type: "object",
                            properties: {
                                "all": {
                                    const: "on"
                                },
                                "monday": {
                                    const: "on"
                                },
                                "tuesday": {
                                    const: "on"
                                },
                                "wednesday": {
                                    const: "on"
                                },
                                "thursday": {
                                    const: "on"
                                },
                                "friday": {
                                    const: "on"
                                }
                            }
                        },
                        "more_info": {
                            type: "string",
                            maxLength: 2000
                        }
                    },
                    required: ["forename", "surname", "gender", "date_of_birth", "municipality", "street_with_number", "postal_code", "days"],
                    "additionalProperties": false
                }
            },
            "agree_correct": {
                const: "on"
            },
            "agree_gdpr": {
                const: "on"
            },
            "agree_photo": {
                const: "on"
            },
        },
        required: ["guardian_name", "guardian_email", "guardian_tel", "children", "agree_correct", "agree_gdpr", "agree_photo"],
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
            return reply.code(400)
                        .view("register.njk", {
                value: req.body, error: new FormError(req.validationError.validation).error})
        }

        /*const user: typeof usersTable.$inferInsert = {
            name: 'John',
            age: 30,
            email: 'john@example.com',
        };

        await db.insert(usersTable).values(user);
        console.log('New user created!')

        const users = await db.select().from(usersTable);

        return users;*/

        reply.code(303) // See Other
            .header('Location', './register-success')
            .send()
    })
}

export default routes;
