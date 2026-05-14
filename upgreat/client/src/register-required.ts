import { toArray } from "drizzle-orm/mysql-core"

export class RequiredHandler {
    constructor() {
        const required_elements = document.getElementsByClassName("required-if-js")
        for (const required_element of required_elements) {
            if (!("required" in required_element)) {
                throw Error("An element without the 'required' property has '.required-if-js' class!")
            }
            required_element.required = true
        }
    }
}