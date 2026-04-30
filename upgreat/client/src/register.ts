class ChildFieldsetHandler {
    children_shown = 1
    child_fieldsets = document.querySelectorAll<HTMLFieldSetElement>("fieldset.nth-child")
    p_max: HTMLParagraphElement
    button_add: HTMLButtonElement
    button_del: HTMLButtonElement

    constructor() {
        const p_max = document.querySelector<HTMLParagraphElement>("p#max-children")
        if (p_max == null) {
            throw new Error("p#max-children not found.")
        }
        this.p_max = p_max;
        const button_add = document.querySelector<HTMLButtonElement>("button[name='add-child']")
        if (button_add == null) {
            throw new Error("button[name='add-child'] not found.")
        }
        this.button_add = button_add;
        this.button_add.addEventListener("click", () => {
            ++this.children_shown
            this.refresh()
        })
        const button_del = document.querySelector<HTMLButtonElement>("button[name='del-child']")
        if (button_del == null) {
            throw new Error("button[name='del-child'] not found.")
        }
        this.button_del = button_del;
        this.button_del.addEventListener("click", () => {
            --this.children_shown
            this.refresh()
        })
        this.refresh()
    }

    refresh() {
        if (this.children_shown > this.child_fieldsets.length || this.children_shown < 1) {
            throw new Error(`this.children_shown out of bounds (0 < ${this.children_shown} <= ${this.child_fieldsets.length}).`)
        }
        for (let i = 0; i < this.child_fieldsets.length; ++i) {
            const hidden = i >= this.children_shown
            this.child_fieldsets[i].hidden = hidden;
            this.child_fieldsets[i].disabled = hidden;
        }
        this.p_max.hidden = this.children_shown < this.child_fieldsets.length
        this.button_add.hidden = false
        this.button_add.disabled = this.children_shown >= this.child_fieldsets.length
        this.button_del.hidden = this.children_shown <= 1
        this.button_del.disabled = this.children_shown <= 1
    }
}

new ChildFieldsetHandler
