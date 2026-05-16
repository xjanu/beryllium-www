export class DaysHandler {
    constructor() {
        const children = document.getElementsByClassName("nth-child")
        for (const child of children) {
            if (!(child instanceof HTMLFieldSetElement)) {
                continue
            }

            const input_all = document.querySelector<HTMLInputElement>(`[name='${child.name}'] .child-days-all`)
            if (input_all == null) {
                throw new Error(`\`[name='${child.name}' .child-days-all\` not found.`)
            }
            const input_days = document.querySelectorAll<HTMLInputElement>(`[name='${child.name}'] .child-days`)
            if (input_days.length != 5) {
                console.log(`Warning: \`[name='${child.name}' .child-days\` has unexpected number of elements!`)
            }
            const warn_div = document.querySelector<HTMLInputElement>(`[name='${child.name}'] .child-days-info`)
            if (warn_div == null) {
                throw new Error(`\`[name='${child.name}'] .child-days-info\` not found.`)
            }

            input_all.disabled = false
            input_all.hidden = false
            input_all.addEventListener("input", () => {
                for (const input_day of input_days) {
                    input_day.checked = input_all.checked
                }
            })
            for (const input_day of input_days) {
                input_day.addEventListener("input", () => {
                    if (! input_day.checked) {
                        input_all.checked = false
                    }
                    let days_checked_count = 0
                    for (const input_day_inner of input_days) {
                        days_checked_count += input_day_inner.checked ? 1 : 0
                    }
                    if (days_checked_count == 4) {
                        warn_div.innerText = "Pri účasti na štyroch dňoch budeme účtovať výhodnejšiu cenu za celý tábor."
                    } else {
                        warn_div.innerText = ""
                    }
                    if (days_checked_count == 5) {
                        input_all.checked = true
                    }
                })
            }
        }
    }
}