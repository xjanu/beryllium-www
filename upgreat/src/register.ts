//@ts-nocheck // TODO: remove:

import { FastifyInstance, FastifyRequest } from "fastify"
import fastifyFormbody from '@fastify/formbody'
import qs from 'qs'
import localize from 'ajv-i18n'
import { eq } from 'drizzle-orm'
import { assert } from "node:console"

import { guardianTable, childTable, genderEnum } from "./db/schema.ts"


// TODO: register as fastify plugin
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
const db = drizzle(process.env.DATABASE_URL!);
if (process.env.NODE_ENV === 'production') {
    await migrate(db, {
        migrationsFolder: "./drizzle-migrations",
    });
}

const MAX_CHILDREN_SOFTLIMIT = 50;

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
                    oneOf: [
                        {
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
                        },
                        {
                            const: {
                                forename: "",
                                surname: "",
                                date_of_birth: "",
                                municipality: "",
                                street_with_number: "",
                                postal_code: "",
                                more_info: ""
                            }
                        }
                    ]
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
        return reply.view('register.njk', {
            overlimit: (await db.$count(childTable)) >= MAX_CHILDREN_SOFTLIMIT
        })
    })

    fastify.post( "/register", {
        attachValidation: true,
        schema: register_schema}, async (req, reply) => {

        // Error handling

        if (req.validationError) {
            (localize as any).sk(req.validationError.validation)
            return reply.code(400)
                        .view("register.njk", {
                value: req.body, error: new FormError(req.validationError.validation).error})
        }

        req.body.children = req.body.children.filter((child) => {
            const a = JSON.stringify(Object.entries(child))
            const b = JSON.stringify(Object.entries({
                forename: "",
                surname: "",
                date_of_birth: "",
                municipality: "",
                street_with_number: "",
                postal_code: "",
                more_info: ""
            }))
            return a !== b
        })

        let error = {children: []}
        for (const req_child_no in req.body.children) {
            const req_child = req.body.children[req_child_no]
            const days: string[] = []
            for (const day in req_child.days) {
                if (req_child.days[day] == "on") {
                    days.push(day)
                }
            }
            assert(days.length > 0, "days.length > 0")
            if (days.includes('all') && days.length > 1) {
                error["children"][req_child_no] = {days: "Nesmie byť zároveň zaškrtnutá položka 'Všetky dni' a ľubovoľný konkrétny deň."}
            }
        }
        if (error.children.length > 0) {
            return reply.code(400)
                        .view("register.njk", {
                value: req.body, error: error})
        }

        // Happy path

        // TODO: use typebox for type inference
        const guardian: typeof guardianTable.$inferInsert = {
            name: req.body.guardian_name,
            email: req.body.guardian_email,
            tel: req.body.guardian_tel
        }
        const inserted_guardian = await db.insert(guardianTable).values(guardian).returning();

        for (const req_child of req.body.children) {
            const child: typeof childTable.$inferInsert = {
                guardian_id: inserted_guardian[0].id,
                forename: req_child.forename,
                surname: req_child.surname,
                gender: req_child.gender,
                date_of_birth: req_child.date_of_birth,
                municipality: req_child.municipality,
                street_with_number: req_child.street_with_number,
                postal_code: req_child.postal_code,
                days_all: req_child.days.all === 'on',
                days_mon: req_child.days.monday === 'on',
                days_tue: req_child.days.tuesday === 'on',
                days_wed: req_child.days.wednesday === 'on',
                days_thu: req_child.days.thursday === 'on',
                days_fri: req_child.days.friday === 'on',
                more_info: req_child.more_info,
            }
            await db.insert(childTable).values(child);
        }

        reply.code(303) // See Other
            .header('Location',
                    (await db.$count(childTable)) > MAX_CHILDREN_SOFTLIMIT ?
                        './register-overlimit' :
                        './register-success' )
            .send()
    })

    fastify.get('/register-success', async (req, reply) => {
        return reply.view('register-success.njk')
    })

    fastify.get('/register-overlimit', async (req, reply) => {
        return reply.view('register-overlimit.njk')
    })
}

export default routes;
