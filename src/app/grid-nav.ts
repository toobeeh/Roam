export class GridNav {

  static navGrid?: GridNav;

  elements: Array<HTMLElement>;
  activeElement: HTMLElement;
  listening: boolean = false;
  parentSelector: string;

  overflowLeft?: GridNav;
  overflowRight?: GridNav;
  overflowBottom?: GridNav;
  overflowTop?: GridNav;

  constructor(parentSelector: string){

    /* get all matching children */
    this.parentSelector = parentSelector;
    const children = document.querySelectorAll(parentSelector + " *[tabindex]");
    this.elements = [...children] as Array<HTMLElement>;
    this.activeElement = this.elements[0];
    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  refreshChildren(){
    const children = document.querySelectorAll(this.parentSelector + " *[tabindex]");
    this.elements = [...children] as Array<HTMLElement>;
  }

  private navigateNext(mode: "x" | "y", direction: 1 |-1, from: HTMLElement): HTMLElement {
    const targetBounds = from.getBoundingClientRect();
    const targetMid = {x: targetBounds.left + targetBounds.width / 2, y: targetBounds.top + targetBounds.height / 2};

    let distances = [...this.elements].map(elem => {
      const elemRect = elem.getBoundingClientRect();
      const vector = {x: elemRect.left + elemRect.width / 2 - targetMid.x, y: -(elemRect.top + elemRect.height / 2 - targetMid.y)};
      let angle = Math.atan2(vector.y, vector.x);
      let deg = angle * 180/Math.PI
      deg = (360 + Math.round(deg)) % 360;

      return {
        element: elem,
        distance: Math.sqrt(vector.x * vector.x + vector.y * vector.y),
        angle: deg
      }
    });

    distances = distances.filter(element => {
      let distanceCheck = element.distance > 0;
      let angleCheck = mode == "x" ? (direction == 1 ? element.angle >= 315 || element.angle <= 45 : element.angle <= 225 && element.angle >= 135)
        : (direction == 1 ? element.angle >= 225 && element.angle <= 315 : element.angle <= 135 && element.angle >= 45);
      return angleCheck && distanceCheck;
    });

    distances.sort((a,b) => a.distance - b.distance);
    if(distances[0]) return distances[0].element;
    else return from;
  }

  private keydownHandler(e: KeyboardEvent): void {
    if(!this.listening || e.which > 40 || e.which < 37) return;

    e.preventDefault();
    let axis: "x" | "y" = e.which == 38 || e.which == 40 ? "y" : "x";
    let dir: 1 | -1  = e.which == 38 || e.which == 37 ? -1 : 1;
    let next = this.navigateNext(axis, dir, this.activeElement);

    /* check if navigation succeeded */
    if(this.activeElement.isEqualNode(next)) {
      let overflowHander = undefined;
      if(axis == "y" && dir == -1 && this.overflowTop) overflowHander = this.overflowTop;
      else if(axis == "y" && dir == 1 && this.overflowBottom) overflowHander = this.overflowBottom;
      else if(axis == "x" && dir == 1 && this.overflowRight) overflowHander = this.overflowRight;
      else if(axis == "x" && dir == -1 && this.overflowLeft) overflowHander = this.overflowLeft;

      /* activate overflow handler */
      if(overflowHander){
        this.stop();
        overflowHander.listen();
      }
    }
    else{
      next.scrollIntoView({block: "center", behavior: "smooth"});
      next.focus({preventScroll: true});
      this.activeElement = next;
    }
  }

  listen(): void {
    this.activeElement.focus();
    this.listening = true;
  }

  stop(): void {
    this.listening = false;
  }
}
