import { observable, action, computed } from "mobx"

export class Todo {
    id = Math.random()
    @observable accessor title = ""
    @observable accessor finished = false

    constructor(title: string) {
        this.title = title
    }

    @action
    toggle() {
        this.finished = !this.finished
    }

    @action
    urgentize () {
        this.title = this.title + "!"
    }

    @computed
    get scream () {
        return this.title.toUpperCase()
    }
}
