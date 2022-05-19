import marshal
import types
IMAGE_PATH = 'my.image'
with open(IMAGE_PATH, 'rb') as file:
  types.FunctionType(marshal.load(file), globals())(file)

print(add_one(4))

