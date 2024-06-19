import { makeObservable, observable, action, computed } from "mobx"

export class Todo {
    id = Math.random()
    title = ""
    finished = false

    constructor(title: string) {
        makeObservable(this, {
            title: observable,
            finished: observable,
            toggle: action,
            urgentize: action,
            scream: computed
        })
        this.title = title
    }

    toggle() {
        this.finished = !this.finished
    }

    urgentize () {
        this.title = this.title + "!"
    }

    get scream () {
        return this.title.toUpperCase()
    }
}
