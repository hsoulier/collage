import { gsap } from "gsap"

const cursor = document.querySelector(".cursor__inner")!
const cursorOut = document.querySelector(".cursor__outer")!
const mouse = {
	x: 0,
	y: 0,
}
const pos = { ...mouse }

export class Cursor {
	public constructor() {
		gsap.ticker.add(this.render)
		document.addEventListener("mousemove", this.onMouseMove)
	}
	private onMouseMove(e: MouseEvent) {
		const el = (e.target as Element).tagName
		;[cursor, cursorOut].forEach(($el) =>
			el === "A"
				? $el.classList.add("link-hover")
				: $el.classList.remove("link-hover")
		)
		mouse.x = e.pageX
		mouse.y = e.pageY
		gsap.set(cursor, {
			...mouse,
		})
	}
	private render() {
		const dt: number = 1 - Math.pow(0.75, gsap.ticker.deltaRatio())
		pos.x += (mouse.x - pos.x) * dt
		pos.y += (mouse.y - pos.y) * dt
		gsap.set(cursorOut, {
			...pos,
		})
	}
}
