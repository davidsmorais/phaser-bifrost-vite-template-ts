// enums that are used in runtime can't be
// placed inside global namespace declaration
// and need to be imported
enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export { Direction };
